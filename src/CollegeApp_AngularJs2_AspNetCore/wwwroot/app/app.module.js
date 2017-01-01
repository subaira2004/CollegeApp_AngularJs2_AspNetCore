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
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var app_component_1 = require('./app.component');
var department_component_1 = require('./department.component');
var department_select_component_1 = require('./department-select.component');
var department_service_1 = require('./department.service');
var section_component_1 = require('./section.component');
var section_service_1 = require('./section.service');
var student_component_1 = require('./student.component');
var student_service_1 = require('./student.service');
var lecturer_component_1 = require('./lecturer.component');
var appRoutes = [
    { path: 'master/department', component: department_component_1.DepartmentComponent },
    { path: 'master/section', component: section_component_1.SectionComponent },
    { path: 'master/student', component: student_component_1.StudentComponent },
    { path: 'master/lecturer', component: lecturer_component_1.LecturerComponent },
    { path: '', redirectTo: '/master/department', pathMatch: 'full' },
    { path: 'master', redirectTo: '/master/department', pathMatch: 'full' },
    { path: '**', component: department_component_1.DepartmentComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                router_1.RouterModule.forRoot(appRoutes)],
            declarations: [
                app_component_1.AppComponent,
                department_component_1.DepartmentComponent,
                department_select_component_1.DepartmentSelectComponent,
                section_component_1.SectionComponent,
                student_component_1.StudentComponent,
                lecturer_component_1.LecturerComponent],
            providers: [department_service_1.DepartmentService, section_service_1.SectionService, student_service_1.StudentService],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map