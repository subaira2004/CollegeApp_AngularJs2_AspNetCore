/// <reference path="./section.d.ts" />
/// <reference path="./department.d.ts" />

import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

import { DepartmentSelectComponent } from './department-select.component';
import { SectionService } from './section.service';


@Component({
    selector: 'section',
    providers: [DepartmentSelectComponent, SectionService],
    templateUrl: "../app/templates/SectionTemplate.html"
})
export class SectionComponent implements OnInit {
    sections: Section[];
    section: Section;
    //newSelectedDept will be used while editing section, at that point, we should pass this sections's department as selected department to <department-select>
    newSelectedDept: Department;
    selectedDept: Department;

    constructor(private sectService: SectionService) {
        this.sections = [];
        this.clearSection();
        this.newSelectedDept = { DepartmentId: 0, Name: "" };
        this.selectedDept = { DepartmentId: 0, Name: "" };
    }

    onSelectDept(_selectedDept: Department): void {
        this.selectedDept = _selectedDept;
    }

    clearSection(): void {
        this.newSelectedDept = { DepartmentId: 0, Name: "" };
        this.selectedDept = { DepartmentId: 0, Name: "" };
        this.section = {
            DepartmentId: 0,
            SectionId: 0,
            SectionName: "",
            DepartmentName: ""
        };
    }

    ngOnInit(): void {
        this.getAllSection();
    }

    //to save or update the current section
    public submit(): void {
        if (this.selectedDept.DepartmentId > 0 && this.section.SectionName != "") {
            this.section.DepartmentId = this.selectedDept.DepartmentId;
            this.section.DepartmentName = this.selectedDept.Name;

            this.sectService.saveSection(this.section)
                .then((sects) => {
                    this.sections = sects;
                    this.clearSection();
                });
        }
    }

    //To Edit the Section
    public editSection(sectiontEdit: Section): void {
        this.sectService.getSectionById(sectiontEdit.SectionId).then((sect) => {
            this.section = sect;
            this.selectedDept = {
                DepartmentId: this.section.DepartmentId,
                Name: this.section.DepartmentName
            };
            this.newSelectedDept = {
                DepartmentId: this.section.DepartmentId,
                Name: this.section.DepartmentName
            };
        });
    }

    //to Delete the Section by id
    public deleteSection(sectiontDel: Section): void {
        if (confirm("Are sure Want to Delete this Section?")) {
            this.sectService.deleteSectionById(sectiontDel.SectionId).then(sects => this.sections = sects);
        }
    }

    //to get app Section via section service and to set to the local section list
    public getAllSection(): void {
        this.sectService.getAllSections().then(sects => this.sections = sects);
    }

}


