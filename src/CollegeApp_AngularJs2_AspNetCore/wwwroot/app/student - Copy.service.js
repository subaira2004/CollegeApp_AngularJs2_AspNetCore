/// <reference path="./Student.d.ts" />
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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
require('rxjs/add/operator/map');
var StudentService = (function () {
    function StudentService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    //to update or add new Student
    StudentService.prototype.saveStudent = function (student) {
        return this.http.post("CollegeAppMaster/Student", JSON.stringify(student), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    //to get all Students
    StudentService.prototype.getAllStudents = function () {
        return this.http.get("CollegeAppMaster/AllStudents")
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    //get the Student By StudentId
    StudentService.prototype.getStudentById = function (StudentId) {
        return this.http.get("CollegeAppMaster/EditStudent?StudentId=" + StudentId)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    //delete the Student By StudentId
    StudentService.prototype.deleteStudentById = function (StudentId) {
        return this.http.get("CollegeAppMaster/DeleteStudent?StudentId=" + StudentId)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    //search the Student by Student name
    StudentService.prototype.searchStudent = function (searchText) {
        return this.http
            .get("CollegeAppMaster/SearchStudent?searchText=" + searchText)
            .map(function (r) { return r.json(); });
    };
    StudentService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    StudentService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], StudentService);
    return StudentService;
}());
exports.StudentService = StudentService;
//# sourceMappingURL=student - Copy.service.js.map