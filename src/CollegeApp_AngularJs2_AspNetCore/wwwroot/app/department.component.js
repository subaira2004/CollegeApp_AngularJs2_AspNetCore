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
var department_service_1 = require('./department.service');
var DepartmentComponent = (function () {
    //for declaring DepartmentService instance and to clear departments array and department object
    function DepartmentComponent(deptService) {
        this.deptService = deptService;
        this.departments = [];
        this.clearDepartment();
    }
    //to fetch initial data
    DepartmentComponent.prototype.ngOnInit = function () {
        this.getAllDepartment();
    };
    //to clear department object
    DepartmentComponent.prototype.clearDepartment = function () {
        this.department = {
            DepartmentId: 0,
            Name: ""
        };
    };
    //to save or update the current department
    DepartmentComponent.prototype.submit = function () {
        var _this = this;
        this.deptService.saveDepartment(this.department)
            .then(function (depts) {
            _this.departments = depts;
            _this.clearDepartment();
        });
    };
    //To Edit the Department
    DepartmentComponent.prototype.editDepartment = function (departmentEdit) {
        var _this = this;
        this.deptService.getDepartmentById(departmentEdit.DepartmentId).then(function (dept) { return _this.department = dept; });
    };
    //to Delete the department by id
    DepartmentComponent.prototype.deleteDepartment = function (departmentDel) {
        var _this = this;
        if (confirm("Are sure Want to Delete this Department?")) {
            this.deptService.deleteDepartmentById(departmentDel.DepartmentId).then(function (depts) { return _this.departments = depts; });
        }
    };
    //to get app department via department service and to set to the local department list
    DepartmentComponent.prototype.getAllDepartment = function () {
        var _this = this;
        this.deptService.getAllDepartments().then(function (depts) { return _this.departments = depts; });
    };
    DepartmentComponent = __decorate([
        core_1.Component({
            selector: 'department',
            templateUrl: "../app/templates/DepartmentTemplate.html",
            providers: [department_service_1.DepartmentService]
        }), 
        __metadata('design:paramtypes', [department_service_1.DepartmentService])
    ], DepartmentComponent);
    return DepartmentComponent;
}());
exports.DepartmentComponent = DepartmentComponent;
//# sourceMappingURL=department.component.js.map