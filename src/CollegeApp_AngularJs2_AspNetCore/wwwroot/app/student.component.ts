/// <reference path="./section.d.ts" />
/// <reference path="./department.d.ts" />
/// <reference path="./student.d.ts" />

import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

import { DepartmentSelectComponent } from './department-select.component';
import { SectionService } from './section.service';
import { StudentService } from './student.service';

@Component({
    selector: 'student',
    templateUrl: "../app/templates/StudentTemplate.html",
    providers: [DepartmentSelectComponent, SectionService, StudentService]

})
export class StudentComponent implements OnInit {
    sections: Section[];
    //section: Section;
    students: Student[];
    student: Student;
    //newSelectedDept will be used while editing student, at that point, we should pass this student's department as selected department to <department-select>
    newSelectedDept: Department;
    selectedDept: Department;

    constructor(private sectService: SectionService, private studService: StudentService) {
        this.sections = [];
        //this.section = this.emptySection();

        this.newSelectedDept = this.emptyDepartment();
        this.selectedDept = this.emptyDepartment();

        this.student = this.emptyStudent();
        this.students = [];
    }

    onSelectDept(_selectedDept: Department): void {
        this.selectedDept = _selectedDept;
        if (this.selectedDept.DepartmentId == 0) {
            this.sections = [];
            this.student.SectionId = 0; //clearing currently selected Section
        }
        else {
            this.getSectionByDeptID(this.selectedDept.DepartmentId);            
        }
    }

    emptyStudent(): Student {
        return {
            StudentId: 0,
            StudentName: "",
            DepartmentId: 0,
            DepartmentName: "",
            SectionId: 0,
            SectionName: "",
            DateOfJoin: null,
            DateofGraduaton: null
        };
    }

    emptyDepartment(): Department {
        return {
            DepartmentId: 0,
            Name: ""
        };
    }

    emptySection(): Section {
        return {
            SectionId: 0,
            SectionName: "",
            DepartmentId: 0,
            DepartmentName: ""
        }
    }

    ngOnInit(): void {
        this.getAllStudent();
    }

    getAllStudent(): void {
        this.studService.getAllStudents().then(studs => this.students = studs);
    }

    getSectionByDeptID(DepartmentId: number): void {
        this.sectService.getDeptSectionByDeptId(DepartmentId).then(sects => this.sections = sects);
    }

    clearStudent(): void {
        this.student = this.emptyStudent();
        this.sections = [];
        //this.section = this.emptySection();

        this.newSelectedDept = this.emptyDepartment();
        this.selectedDept = this.emptyDepartment();

    }

    //to save or update the current student
    public submit(): void {
        if (this.selectedDept.DepartmentId > 0) {
            this.student.DepartmentId = this.selectedDept.DepartmentId;
            this.student.DepartmentName = this.selectedDept.Name;

            this.studService.saveStudent(this.student)
                .then((studs) => {
                    this.students = studs;
                    this.clearStudent();
                });
        }
    }

    //To Edit the Student
    public editStudent(studentEdit: Student): void {
        this.studService.getStudentById(studentEdit.StudentId).then((stud) => {
            this.student = stud;
            this.selectedDept = {
                DepartmentId: this.student.DepartmentId,
                Name: this.student.DepartmentName
            };
            this.newSelectedDept = {
                DepartmentId: this.student.DepartmentId,
                Name: this.student.DepartmentName
            };
            this.getSectionByDeptID(this.student.DepartmentId);
        });
    }

    //to Delete the Student by id
    public deleteStudent(studentDel: Student): void {
        if (confirm("Are sure Want to Delete this Student?")) {
            this.studService.deleteStudentById(studentDel.StudentId).then(studs => this.students = studs);
        }
    }

}
