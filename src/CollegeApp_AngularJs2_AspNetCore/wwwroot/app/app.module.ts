import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpModule } from '@angular/http';

import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DepartmentComponent } from './department.component';
import { DepartmentSelectComponent } from './department-select.component';
import { DepartmentService } from './department.service';
import { SectionComponent } from './section.component';
import { SectionService } from './section.service';
import { StudentComponent } from './student.component';
import { StudentService } from './student.service';
import { LecturerComponent } from './lecturer.component';
import { LecturerService } from './lecturer.service';

const appRoutes: Routes = [
    { path: 'master/department', component: DepartmentComponent },
    { path: 'master/section', component: SectionComponent },
    { path: 'master/student', component: StudentComponent },
    { path: 'master/lecturer', component: LecturerComponent },
    { path: '', redirectTo: '/master/department', pathMatch: 'full' },
    { path: 'master', redirectTo: '/master/department', pathMatch: 'full' },
    { path: '**', component: DepartmentComponent }
];


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes)],
    declarations: [
        AppComponent,
        DepartmentComponent,
        DepartmentSelectComponent,
        SectionComponent,
        StudentComponent,
        LecturerComponent],
    providers: [DepartmentService, SectionService, StudentService, LecturerService],
    bootstrap: [AppComponent]
})
export class AppModule { }
