/// <reference path="./Student.d.ts" />

import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class StudentService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    constructor(private http: Http) {

    }

    //to update or add new Student
    saveStudent(student: Student): Promise<Student[]> {
        return this.http.post("CollegeAppMaster/Student", JSON.stringify(student), { headers: this.headers })
            .toPromise()
            .then(response => response.json() as Student[])
            .catch(this.handleError);
    }

    //to get all Students
    getAllStudents(): Promise<Student[]> {
        return this.http.get("CollegeAppMaster/AllStudents")
            .toPromise()
            .then(response => response.json() as Student[])
            .catch(this.handleError);
    }

    //get the Student By StudentId
    getStudentById(StudentId: number): Promise<Student> {
        return this.http.get("CollegeAppMaster/EditStudent?StudentId=" + StudentId)
            .toPromise()
            .then(response => response.json() as Student)
            .catch(this.handleError);
    }

    //delete the Student By StudentId
    deleteStudentById(StudentId: number): Promise<Student[]> {
        return this.http.get("CollegeAppMaster/DeleteStudent?StudentId=" + StudentId)
            .toPromise()
            .then(response => response.json() as Student[])
            .catch(this.handleError);
    }

   

    //search the Student by Student name
    searchStudent(searchText: string): Observable<Student[]> {
        return this.http
            .get(`CollegeAppMaster/SearchStudent?searchText=${searchText}`)
            .map((r: Response) => r.json() as Student[]);

    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}