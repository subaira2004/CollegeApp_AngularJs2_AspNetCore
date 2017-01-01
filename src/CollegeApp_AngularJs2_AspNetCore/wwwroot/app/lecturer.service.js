/// <reference path="./Lecturer.d.ts" />
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
var LecturerService = (function () {
    function LecturerService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    //to update or add new Lecturer
    LecturerService.prototype.saveLecturer = function (lecturer) {
        return this.http.post("CollegeAppMaster/Lecturer", JSON.stringify(lecturer), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    //to get all Lecturers
    LecturerService.prototype.getAllLecturers = function () {
        return this.http.get("CollegeAppMaster/AllLecturers")
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    //get the Lecturer By LecturerId
    LecturerService.prototype.getLecturerById = function (LecturerId) {
        return this.http.get("CollegeAppMaster/EditLecturer?LecturerId=" + LecturerId)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    //delete the Lecturer By LecturerId
    LecturerService.prototype.deleteLecturerById = function (LecturerId) {
        return this.http.get("CollegeAppMaster/DeleteLecturer?LecturerId=" + LecturerId)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    //search the Lecturer by Lecturer name
    LecturerService.prototype.searchLecturer = function (searchText) {
        return this.http
            .get("CollegeAppMaster/SearchLecturer?searchText=" + searchText)
            .map(function (r) { return r.json(); });
    };
    LecturerService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    LecturerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], LecturerService);
    return LecturerService;
}());
exports.LecturerService = LecturerService;
//# sourceMappingURL=lecturer.service.js.map