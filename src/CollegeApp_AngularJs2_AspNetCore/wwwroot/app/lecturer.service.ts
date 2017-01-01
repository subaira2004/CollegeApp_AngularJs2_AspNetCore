/// <reference path="./Lecturer.d.ts" />

import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class    LecturerService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    constructor(private http: Http) {

    }

    //to update or add new Lecturer
    saveLecturer(lecturer: Lecturer): Promise<Lecturer[]> {
        return this.http.post("CollegeAppMaster/Lecturer", JSON.stringify(lecturer), { headers: this.headers })
            .toPromise()
            .then(response => response.json() as Lecturer[])
            .catch(this.handleError);
    }

    //to get all Lecturers
    getAllLecturers(): Promise<Lecturer[]> {
        return this.http.get("CollegeAppMaster/AllLecturers")
            .toPromise()
            .then(response => response.json() as Lecturer[])
            .catch(this.handleError);
    }

    //get the Lecturer By LecturerId
    getLecturerById(LecturerId: number): Promise<Lecturer> {
        return this.http.get("CollegeAppMaster/EditLecturer?LecturerId=" + LecturerId)
            .toPromise()
            .then(response => response.json() as Lecturer)
            .catch(this.handleError);
    }

    //delete the Lecturer By LecturerId
    deleteLecturerById(LecturerId: number): Promise<Lecturer[]> {
        return this.http.get("CollegeAppMaster/DeleteLecturer?LecturerId=" + LecturerId)
            .toPromise()
            .then(response => response.json() as Lecturer[])
            .catch(this.handleError);
    }

   

    //search the Lecturer by Lecturer name
    searchLecturer(searchText: string): Observable<Lecturer[]> {
        return this.http
            .get(`CollegeAppMaster/SearchLecturer?searchText=${searchText}`)
            .map((r: Response) => r.json() as Lecturer[]);

    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}