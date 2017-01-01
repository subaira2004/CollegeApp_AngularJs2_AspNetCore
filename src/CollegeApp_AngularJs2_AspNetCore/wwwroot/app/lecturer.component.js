/// <reference path="./lecturer.d.ts" />
/// <reference path="./department.d.ts" />
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
var lecturer_service_1 = require('./lecturer.service');
var LecturerComponent = (function () {
    function LecturerComponent(lectService) {
        this.lectService = lectService;
        this.lecturers = [];
        this.clearLecturer();
        this.newSelectedDept = { DepartmentId: 0, Name: "" };
        this.selectedDept = { DepartmentId: 0, Name: "" };
    }
    LecturerComponent.prototype.onSelectDept = function (_selectedDept) {
        this.selectedDept = _selectedDept;
    };
    LecturerComponent.prototype.clearLecturer = function () {
        this.newSelectedDept = this.emptyDepartment();
        this.selectedDept = this.emptyDepartment();
        this.lecturer = this.emptyLecturer();
        return false;
    };
    LecturerComponent.prototype.emptyDepartment = function () {
        return { DepartmentId: 0, Name: "" };
    };
    LecturerComponent.prototype.emptyLecturer = function () {
        return {
            LecturerId: 0,
            DepartmentId: 0,
            LecturerName: "",
            DepartmentName: ""
        };
    };
    LecturerComponent.prototype.ngOnInit = function () {
        this.getAllLecturer();
    };
    //to save or update the current lecturer
    LecturerComponent.prototype.submit = function () {
        var _this = this;
        if (this.selectedDept.DepartmentId > 0 && this.lecturer.LecturerName != "") {
            this.lecturer.DepartmentId = this.selectedDept.DepartmentId;
            this.lecturer.DepartmentName = this.selectedDept.Name;
            this.lectService.saveLecturer(this.lecturer)
                .then(function (lects) {
                _this.lecturers = lects;
                _this.clearLecturer();
            });
        }
    };
    //To Edit the Lecturer
    LecturerComponent.prototype.editLecturer = function (lecturerEdit) {
        var _this = this;
        this.lectService.getLecturerById(lecturerEdit.LecturerId).then(function (lect) {
            _this.lecturer = lect;
            _this.selectedDept = {
                DepartmentId: _this.lecturer.DepartmentId,
                Name: _this.lecturer.DepartmentName
            };
            _this.newSelectedDept = {
                DepartmentId: _this.lecturer.DepartmentId,
                Name: _this.lecturer.DepartmentName
            };
        });
    };
    //to Delete the Lecturer by id
    LecturerComponent.prototype.deleteLecturer = function (lecturertDel) {
        var _this = this;
        if (confirm("Are sure Want to Delete this Lecturer?")) {
            this.lectService.deleteLecturerById(lecturertDel.LecturerId).then(function (lects) { return _this.lecturers = lects; });
        }
    };
    //to get app Lecturer via Lecturer service and to set to the local Lecturer list
    LecturerComponent.prototype.getAllLecturer = function () {
        var _this = this;
        this.lectService.getAllLecturers().then(function (lects) { return _this.lecturers = lects; });
    };
    LecturerComponent = __decorate([
        core_1.Component({
            selector: 'lecturer',
            templateUrl: "../app/templates/LecturerTemplate.html",
            providers: [department_select_component_1.DepartmentSelectComponent, lecturer_service_1.LecturerService]
        }), 
        __metadata('design:paramtypes', [lecturer_service_1.LecturerService])
    ], LecturerComponent);
    return LecturerComponent;
}());
exports.LecturerComponent = LecturerComponent;
//# sourceMappingURL=lecturer.component.js.map