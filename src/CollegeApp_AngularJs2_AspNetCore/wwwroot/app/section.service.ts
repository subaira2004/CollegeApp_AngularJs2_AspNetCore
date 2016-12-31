/// <reference path="./section.d.ts" />

import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class SectionService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    constructor(private http: Http) {

    }

    //to update or add new Section
    saveSection(section: Section): Promise<Section[]> {
        return this.http.post("CollegeAppMaster/Section", JSON.stringify(section), { headers: this.headers })
            .toPromise()
            .then(response => response.json() as Section[])
            .catch(this.handleError);
    }

    //to get all sections
    getAllSections(): Promise<Section[]> {
        return this.http.get("CollegeAppMaster/AllSections")
            .toPromise()
            .then(response => response.json() as Section[])
            .catch(this.handleError);
    }

    //get the Section By SectionId
    getSectionById(SectionId: number): Promise<Section> {
        return this.http.get("CollegeAppMaster/EditSection?SectionId=" + SectionId)
            .toPromise()
            .then(response => response.json() as Section)
            .catch(this.handleError);
    }

    //delete the Section By SectionId
    deleteSectionById(SectionId: number): Promise<Section[]> {
        return this.http.get("CollegeAppMaster/DeleteSection?SectionId=" + SectionId)
            .toPromise()
            .then(response => response.json() as Section[])
            .catch(this.handleError);
    }

    //get the Sections By departmentId
    getDeptSectionByDeptId(DepartmentId: number): Promise<Section[]> {
        return this.http.get("CollegeAppMaster/GetDeptSectionByDeptId?DepartmentId=" + DepartmentId)
            .toPromise()
            .then(response => response.json() as Section[])
            .catch(this.handleError);
    }

    //search the section by section name
    searchSection(searchText: string): Observable<Section[]> {
        return this.http
            .get(`CollegeAppMaster/SearchSection?searchText=${searchText}`)
            .map((r: Response) => r.json() as Section[]);

    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}