/// <reference path="./lecturer.d.ts" />
/// <reference path="./department.d.ts" />

import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

import { DepartmentSelectComponent } from './department-select.component';
import { LecturerService } from './lecturer.service';

@Component({
    selector: 'lecturer',
    templateUrl: "../app/templates/LecturerTemplate.html",
    providers: [DepartmentSelectComponent, LecturerService]
})
export class LecturerComponent implements OnInit {
    lecturers: Lecturer[];
    lecturer: Lecturer;
    //newSelectedDept will be used while editing lecturer, at that point, 
    //we should pass this lecturer's department as selected department to <department-select>
    newSelectedDept: Department;
    selectedDept: Department;
    constructor(private lectService: LecturerService) {
        this.lecturers = [];
        this.clearLecturer();
        this.newSelectedDept = { DepartmentId: 0, Name: "" };
        this.selectedDept = { DepartmentId: 0, Name: "" };
    }

    onSelectDept(_selectedDept: Department): void {
        this.selectedDept = _selectedDept;
    }

    clearLecturer(): boolean {
        this.newSelectedDept = this.emptyDepartment();
        this.selectedDept = this.emptyDepartment();
        this.lecturer = this.emptyLecturer();
        return false;
    }

    emptyDepartment(): Department {
        return { DepartmentId: 0, Name: "" };
    }

    emptyLecturer(): Lecturer {
        return {
            LecturerId: 0,
            DepartmentId: 0,
            LecturerName: "",
            DepartmentName: ""
        };
    }


    ngOnInit(): void {
        this.getAllLecturer();
    }

    //to save or update the current lecturer
    public submit(): void {
        if (this.selectedDept.DepartmentId > 0 && this.lecturer.LecturerName != "") {
            this.lecturer.DepartmentId = this.selectedDept.DepartmentId;
            this.lecturer.DepartmentName = this.selectedDept.Name;

            this.lectService.saveLecturer(this.lecturer)
                .then((lects) => {
                    this.lecturers = lects;
                    this.clearLecturer();
                });
        }
    }

    //To Edit the Lecturer
    public editLecturer(lecturerEdit: Lecturer): void {
        this.lectService.getLecturerById(lecturerEdit.LecturerId).then((lect) => {
            this.lecturer = lect;
            this.selectedDept = {
                DepartmentId: this.lecturer.DepartmentId,
                Name: this.lecturer.DepartmentName
            };
            this.newSelectedDept = {
                DepartmentId: this.lecturer.DepartmentId,
                Name: this.lecturer.DepartmentName
            };
        });
    }

    //to Delete the Lecturer by id
    public deleteLecturer(lecturertDel: Lecturer): void {
        if (confirm("Are sure Want to Delete this Lecturer?")) {
            this.lectService.deleteLecturerById(lecturertDel.LecturerId).then(lects => this.lecturers = lects);
        }
    }

    //to get app Lecturer via Lecturer service and to set to the local Lecturer list
    public getAllLecturer(): void {
        this.lectService.getAllLecturers().then(lects => this.lecturers = lects);
    }


}
