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
var Subject_1 = require('rxjs/Subject');
var Subscription_1 = require('rxjs/Subscription');
var department_service_1 = require('./department.service');
// Observable class extensions
require('rxjs/add/observable/of');
require('rxjs/add/observable/throw');
// Observable operators
require('rxjs/add/operator/catch');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
require('rxjs/add/operator/do');
require('rxjs/add/operator/filter');
require('rxjs/add/operator/map');
require('rxjs/add/operator/switchMap');
require('rxjs/add/operator/toPromise');
var DepartmentSelectComponent = (function () {
    function DepartmentSelectComponent(deptService) {
        this.deptService = deptService;
        this.searchTerms = new Subject_1.Subject();
        this.onSelectDept = new core_1.EventEmitter();
        this.clearSelectedDepartment();
        this.selectedDeptName = "";
        this.subscription = new Subscription_1.Subscription();
    }
    Object.defineProperty(DepartmentSelectComponent.prototype, "newSelectedDept", {
        //to get the input from the parent as selected department
        set: function (newSelectedDept) {
            this.selectedDept = newSelectedDept;
            this.selectedDeptName = this.selectedDept.Name;
            if (newSelectedDept.Name == "") {
                this.searchedDepartments = [];
            }
        },
        enumerable: true,
        configurable: true
    });
    DepartmentSelectComponent.prototype.emptyDepartment = function () {
        return {
            DepartmentId: 0,
            Name: ""
        };
    };
    DepartmentSelectComponent.prototype.clearSelectedDepartment = function () {
        this.selectedDept = {
            DepartmentId: 0,
            Name: ""
        };
    };
    DepartmentSelectComponent.prototype.search = function (term) {
        if (term != this.selectedDept.Name) {
            this.onSelectDept.emit(this.emptyDepartment()); //if anything changed we should emit 
            this.clearSelectedDepartment();
        }
        this.searchTerms.next(term);
        if (term.length == 0) {
            this.searchedDepartments = [];
        }
    };
    DepartmentSelectComponent.prototype.selectDeptBoxButtonClick = function () {
        var _this = this;
        if (this.searchedDepartments.length > 0) {
            this.searchedDepartments = [];
        }
        else {
            this.deptService.getAllDepartments().then(function (depts) { return _this.searchedDepartments = depts; });
        }
    };
    DepartmentSelectComponent.prototype.selectDepartment = function (dept) {
        this.selectedDept = dept;
        this.selectedDeptName = this.selectedDept.Name;
        this.onSelectDept.emit(this.selectedDept); //emitting selected Department to Parent Component
        this.searchedDepartments = [];
    };
    DepartmentSelectComponent.prototype.cancel = function () {
        this.clearSelectedDepartment();
        this.onSelectDept.emit(this.emptyDepartment());
        this.selectedDeptName = "";
        this.searchedDepartments = [];
    };
    DepartmentSelectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.searchTerms
            .debounceTime(300) // wait for 300ms pause in events
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(function (term) { return term // switch to new observable each time
            ? _this.deptService.searchDepartment(term)
            : []; })
            .catch(function (error) {
            // TODO: real error handling
            console.log(error);
            return [];
        }).subscribe(function (result) {
            _this.searchedDepartments = result;
        });
    };
    DepartmentSelectComponent.prototype.ngOnDestroy = function () {
        // and don't forget cleanup
        this.subscription.unsubscribe();
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DepartmentSelectComponent.prototype, "onSelectDept", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], DepartmentSelectComponent.prototype, "newSelectedDept", null);
    DepartmentSelectComponent = __decorate([
        core_1.Component({
            selector: 'department-select',
            providers: [department_service_1.DepartmentService],
            templateUrl: "../app/templates/DepartmentSelectTemplate.html",
            styleUrls: ["../content/css/DepartmentSelectComponent.css"]
        }), 
        __metadata('design:paramtypes', [department_service_1.DepartmentService])
    ], DepartmentSelectComponent);
    return DepartmentSelectComponent;
}());
exports.DepartmentSelectComponent = DepartmentSelectComponent;
//# sourceMappingURL=department-select.component.js.map