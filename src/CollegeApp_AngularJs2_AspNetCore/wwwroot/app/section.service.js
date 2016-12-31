/// <reference path="./section.d.ts" />
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
var SectionService = (function () {
    function SectionService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    //to update or add new Section
    SectionService.prototype.saveSection = function (section) {
        return this.http.post("CollegeAppMaster/Section", JSON.stringify(section), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    //to get all sections
    SectionService.prototype.getAllSections = function () {
        return this.http.get("CollegeAppMaster/AllSections")
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    //get the Section By SectionId
    SectionService.prototype.getSectionById = function (SectionId) {
        return this.http.get("CollegeAppMaster/EditSection?SectionId=" + SectionId)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    //delete the Section By SectionId
    SectionService.prototype.deleteSectionById = function (SectionId) {
        return this.http.get("CollegeAppMaster/DeleteSection?SectionId=" + SectionId)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    //get the Sections By departmentId
    SectionService.prototype.getDeptSectionByDeptId = function (DepartmentId) {
        return this.http.get("CollegeAppMaster/GetDeptSectionByDeptId?DepartmentId=" + DepartmentId)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    //search the section by section name
    SectionService.prototype.searchSection = function (searchText) {
        return this.http
            .get("CollegeAppMaster/SearchSection?searchText=" + searchText)
            .map(function (r) { return r.json(); });
    };
    SectionService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    SectionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SectionService);
    return SectionService;
}());
exports.SectionService = SectionService;
//# sourceMappingURL=section.service.js.map