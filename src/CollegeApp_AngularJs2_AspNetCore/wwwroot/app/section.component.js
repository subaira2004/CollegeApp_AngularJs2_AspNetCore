/// <reference path="./section.d.ts" />
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
var section_service_1 = require('./section.service');
var SectionComponent = (function () {
    function SectionComponent(sectService) {
        this.sectService = sectService;
        this.sections = [];
        this.clearSection();
        this.newSelectedDept = { DepartmentId: 0, Name: "" };
        this.selectedDept = { DepartmentId: 0, Name: "" };
    }
    SectionComponent.prototype.onSelectDept = function (_selectedDept) {
        this.selectedDept = _selectedDept;
    };
    SectionComponent.prototype.clearSection = function () {
        this.newSelectedDept = { DepartmentId: 0, Name: "" };
        this.selectedDept = { DepartmentId: 0, Name: "" };
        this.section = {
            DepartmentId: 0,
            SectionId: 0,
            SectionName: "",
            DepartmentName: ""
        };
    };
    SectionComponent.prototype.ngOnInit = function () {
        this.getAllSection();
    };
    //to save or update the current section
    SectionComponent.prototype.submit = function () {
        var _this = this;
        if (this.selectedDept.DepartmentId > 0 && this.section.SectionName != "") {
            this.section.DepartmentId = this.selectedDept.DepartmentId;
            this.section.DepartmentName = this.selectedDept.Name;
            this.sectService.saveSection(this.section)
                .then(function (sects) {
                _this.sections = sects;
                _this.clearSection();
            });
        }
    };
    //To Edit the Section
    SectionComponent.prototype.editSection = function (sectiontEdit) {
        var _this = this;
        this.sectService.getSectionById(sectiontEdit.SectionId).then(function (sect) {
            _this.section = sect;
            _this.selectedDept = {
                DepartmentId: _this.section.DepartmentId,
                Name: _this.section.DepartmentName
            };
            _this.newSelectedDept = {
                DepartmentId: _this.section.DepartmentId,
                Name: _this.section.DepartmentName
            };
        });
    };
    //to Delete the Section by id
    SectionComponent.prototype.deleteSection = function (sectiontDel) {
        var _this = this;
        if (confirm("Are sure Want to Delete this Section?")) {
            this.sectService.deleteSectionById(sectiontDel.SectionId).then(function (sects) { return _this.sections = sects; });
        }
    };
    //to get app Section via section service and to set to the local section list
    SectionComponent.prototype.getAllSection = function () {
        var _this = this;
        this.sectService.getAllSections().then(function (sects) { return _this.sections = sects; });
    };
    SectionComponent = __decorate([
        core_1.Component({
            selector: 'section',
            providers: [department_select_component_1.DepartmentSelectComponent, section_service_1.SectionService],
            templateUrl: "../app/templates/SectionTemplate.html"
        }), 
        __metadata('design:paramtypes', [section_service_1.SectionService])
    ], SectionComponent);
    return SectionComponent;
}());
exports.SectionComponent = SectionComponent;
//# sourceMappingURL=section.component.js.map