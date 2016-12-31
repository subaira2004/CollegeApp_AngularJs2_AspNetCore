/// <reference path="./department.d.ts" />

import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


@Injectable()
export class DepartmentService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    constructor(private http: Http) {

    }

    //to update or add new Department
    saveDepartment(department: Department): Promise<Department[]> {
        return this.http.post("CollegeAppMaster/Department", JSON.stringify(department), { headers: this.headers })
            .toPromise()
            .then(response => response.json() as Department[])
            .catch(this.handleError);
    }

    //to get all departments
    getAllDepartments(): Promise<Department[]> {
        return this.http.get("CollegeAppMaster/AllDepartments")
            .toPromise()
            .then(response => response.json() as Department[])
            .catch(this.handleError);
    }

    //get the Department By DepartmentId
    getDepartmentById(DepartmentId: number): Promise<Department> {
        return this.http.get("CollegeAppMaster/EditDepartments?DepartmentId=" + DepartmentId)
            .toPromise()
            .then(response => response.json() as Department)
            .catch(this.handleError);
    }

    //delete the Department By DepartmentId
    deleteDepartmentById(DepartmentId: number): Promise<Department[]> {
        return this.http.get("CollegeAppMaster/DeleteDepartments?DepartmentId=" + DepartmentId)
            .toPromise()
            .then(response => response.json() as Department[])
            .catch(this.handleError);
    }

    searchDepartment(searchText: string): Observable<Department[]> {
        return this.http
            .get(`CollegeAppMaster/SearchDepartment?searchText=${searchText}`)
            .map((r: Response) => r.json() as Department[]);

    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }


}