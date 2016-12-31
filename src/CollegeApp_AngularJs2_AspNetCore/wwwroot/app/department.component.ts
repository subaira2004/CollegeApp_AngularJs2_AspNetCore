/// <reference path="./department.d.ts" />

import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

import { DepartmentService } from './department.service';








@Component({
    selector: 'department',
    templateUrl: "../app/templates/DepartmentTemplate.html",
    providers: [DepartmentService]
})
export class DepartmentComponent implements OnInit {
    departments: Department[];
    department: Department;

    //for declaring DepartmentService instance and to clear departments array and department object
    constructor(private deptService: DepartmentService) {
        this.departments = [];
        this.clearDepartment();

    }

    //to fetch initial data
    ngOnInit(): void {
        this.getAllDepartment();
    }

    //to clear department object
    public clearDepartment(): void {
        this.department = {
            DepartmentId: 0,
            Name: ""
        }
    }

    //to save or update the current department
    public submit(): void {
        this.deptService.saveDepartment(this.department)
            .then((depts) => {
                this.departments = depts;
                this.clearDepartment();
            });
    }

    //To Edit the Department
    public editDepartment(departmentEdit: Department): void {
        this.deptService.getDepartmentById(departmentEdit.DepartmentId).then(dept => this.department = dept);
    }

    //to Delete the department by id
    public deleteDepartment(departmentDel: Department): void {
        if (confirm("Are sure Want to Delete this Department?")) {
            this.deptService.deleteDepartmentById(departmentDel.DepartmentId).then(depts => this.departments = depts);
        }
    }


    //to get app department via department service and to set to the local department list
    public getAllDepartment(): void {
        this.deptService.getAllDepartments().then(depts => this.departments = depts);
    }


}


