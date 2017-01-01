/// <reference path="./section.d.ts" />
/// <reference path="./department.d.ts" />
/// <reference path="./student.d.ts" />
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var department_select_component_1 = require('./department-select.component');
var section_service_1 = require('./section.service');
var student_service_1 = require('./student.service');
var StudentComponent = (function () {
    function StudentComponent(sectService, studService) {
        this.sectService = sectService;
        this.studService = studService;
        this.sections = [];
        //this.section = this.emptySection();
        this.newSelectedDept = this.emptyDepartment();
        this.selectedDept = this.emptyDepartment();
        this.student = this.emptyStudent();
        this.students = [];
    }
    StudentComponent.prototype.onSelectDept = function (_selectedDept) {
        this.selectedDept = _selectedDept;
        if (this.selectedDept.DepartmentId == 0) {
            this.sections = [];
            this.student.SectionId = 0; //clearing currently selected Section
        }
        else {
            this.getSectionByDeptID(this.selectedDept.DepartmentId);
        }
    };
    StudentComponent.prototype.emptyStudent = function () {
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
    };
    StudentComponent.prototype.emptyDepartment = function () {
        return {
            DepartmentId: 0,
            Name: ""
        };
    };
    StudentComponent.prototype.emptySection = function () {
        return {
            SectionId: 0,
            SectionName: "",
            DepartmentId: 0,
            DepartmentName: ""
        };
    };
    StudentComponent.prototype.ngOnInit = function () {
        this.getAllStudent();
    };
    StudentComponent.prototype.getAllStudent = function () {
        var _this = this;
        this.studService.getAllStudents().then(function (studs) { return _this.students = studs; });
    };
    StudentComponent.prototype.getSectionByDeptID = function (DepartmentId) {
        var _this = this;
        this.sectService.getDeptSectionByDeptId(DepartmentId).then(function (sects) { return _this.sections = sects; });
    };
    StudentComponent.prototype.clearStudent = function () {
        this.student = this.emptyStudent();
        this.sections = [];
        //this.section = this.emptySection();
        this.newSelectedDept = this.emptyDepartment();
        this.selectedDept = this.emptyDepartment();
    };
    //to save or update the current student
    StudentComponent.prototype.submit = function () {
        var _this = this;
        if (this.selectedDept.DepartmentId > 0) {
            this.student.DepartmentId = this.selectedDept.DepartmentId;
            this.student.DepartmentName = this.selectedDept.Name;
            this.studService.saveStudent(this.student)
                .then(function (studs) {
                _this.students = studs;
                _this.clearStudent();
            });
        }
    };
    //To Edit the Student
    StudentComponent.prototype.editStudent = function (studentEdit) {
        var _this = this;
        this.studService.getStudentById(studentEdit.StudentId).then(function (stud) {
            _this.student = stud;
            _this.selectedDept = {
                DepartmentId: _this.student.DepartmentId,
                Name: _this.student.DepartmentName
            };
            _this.newSelectedDept = {
                DepartmentId: _this.student.DepartmentId,
                Name: _this.student.DepartmentName
            };
            _this.getSectionByDeptID(_this.student.DepartmentId);
        });
    };
    //to Delete the Student by id
    StudentComponent.prototype.deleteStudent = function (studentDel) {
        var _this = this;
        if (confirm("Are sure Want to Delete this Student?")) {
            this.studService.deleteStudentById(studentDel.StudentId).then(function (studs) { return _this.students = studs; });
        }
    };
    StudentComponent = __decorate([
        core_1.Component({
            selector: 'student',
            templateUrl: "../app/templates/StudentTemplate.html",
            providers: [department_select_component_1.DepartmentSelectComponent, section_service_1.SectionService, student_service_1.StudentService]
        }), 
        __metadata('design:paramtypes', [section_service_1.SectionService, student_service_1.StudentService])
    ], StudentComponent);
    return StudentComponent;
}());
exports.StudentComponent = StudentComponent;
//# sourceMappingURL=student.component.js.map