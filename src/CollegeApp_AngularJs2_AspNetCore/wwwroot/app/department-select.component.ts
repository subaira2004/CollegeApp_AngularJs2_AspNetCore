/// <reference path="./department.d.ts" />

import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { NgFor } from '@angular/common';
import { Observable } from 'rxjs/observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { DepartmentService } from './department.service';


// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';


@Component({
    selector: 'department-select',
    providers: [DepartmentService],
    templateUrl: "../app/templates/DepartmentSelectTemplate.html",
    styleUrls: ["../content/css/DepartmentSelectComponent.css"]
})
export class DepartmentSelectComponent implements OnInit, OnDestroy {

    searchedDepartments: Department[];
    private searchTerms = new Subject<string>();
    private subscription: Subscription;
    selectedDeptName: string;
    selectedDept: Department;

    @Output() onSelectDept = new EventEmitter<Department>();



    constructor(private deptService: DepartmentService) {
        this.clearSelectedDepartment();
        this.selectedDeptName = "";
        this.subscription = new Subscription();
    }

    //to get the input from the parent as selected department
    @Input() set newSelectedDept(newSelectedDept: Department) {
        this.selectedDept = newSelectedDept;
        this.selectedDeptName = this.selectedDept.Name;
        if (newSelectedDept.Name == "") {
            this.searchedDepartments = [];
        }
    }

    emptyDepartment(): Department {
        return {
            DepartmentId: 0,
            Name: ""
        };
    }

    clearSelectedDepartment() {
        this.selectedDept = {
            DepartmentId: 0,
            Name: ""
        };
    }

    search(term: string): void {
        if (term != this.selectedDept.Name) {
            this.onSelectDept.emit(this.emptyDepartment()); //if anything changed we should emit 
            this.clearSelectedDepartment();
        }

        this.searchTerms.next(term);

        if (term.length == 0) {
            this.searchedDepartments = [];
        }
    }

    selectDeptBoxButtonClick(): void {
        if (this.searchedDepartments.length > 0) {
            this.searchedDepartments = [];
        }
        else {
            this.deptService.getAllDepartments().then(depts => this.searchedDepartments = depts);
        }
    }

    selectDepartment(dept: Department): void {
        this.selectedDept = dept;
        this.selectedDeptName = this.selectedDept.Name;
        this.onSelectDept.emit(this.selectedDept);//emitting selected Department to Parent Component
        this.searchedDepartments = [];
    }

    public cancel(): void {
        this.clearSelectedDepartment();
        this.onSelectDept.emit(this.emptyDepartment());
        this.selectedDeptName = "";
        this.searchedDepartments = [];
    }

    ngOnInit(): void {
        this.subscription = this.searchTerms
            .debounceTime(300)        // wait for 300ms pause in events
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time
                // return the http search observable
                ? this.deptService.searchDepartment(term)
                // or the observable of empty department if no search term
                : [])
            .catch(error => {
                // TODO: real error handling
                console.log(error);
                return [];
            }).subscribe((result: Department[]) => {
                this.searchedDepartments = result;
            });
    }

    ngOnDestroy(): void {
        // and don't forget cleanup
        this.subscription.unsubscribe();
    }


}