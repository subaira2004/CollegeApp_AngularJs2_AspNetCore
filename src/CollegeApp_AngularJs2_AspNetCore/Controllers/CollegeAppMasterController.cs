using CollegeApp_AngularJs2_AspNetCore.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;

namespace CollegeApp_AngularJs2_AspNetCore.Controllers
{
    public class CollegeAppMasterController : Controller
    {
        CollegeAppDBContext context;
        IHostingEnvironment env;

        public CollegeAppMasterController(CollegeAppDBContext _context, IHostingEnvironment _env)
        {
            context = _context;
            env = _env;
        }

        // GET: CollegeAppMaster
        public ActionResult Index()
        {
            // var reader = new StreamReader(env.WebRootPath+"\\Master.html");
            //var contents = "";// File()
            //return Content(contents, "text/html");
            return Redirect("../master.html");
        }

        #region "Department"
        public ActionResult Department()
        {
            return PartialView();
        }

        [HttpPost]
        public JsonResult Department([FromBody]Department dept)
        {
            if (ModelState.IsValid)
            {
                if (dept.DepartmentId > 0) // Edit Operation
                    context.Entry(dept).State = EntityState.Modified;
                else
                    context.Departments.Add(dept);

                context.SaveChanges();
            }
            return AllDepartments();
        }

        [HttpGet]
        public JsonResult AllDepartments()
        {
            //return Json(context.Departments.Take(10).OrderByDescending(x => x.DepartmentId).ToList(), JsonRequestBehavior.AllowGet);
            return Json(context.Departments.ToList());
        }

        [HttpGet]
        public JsonResult EditDepartments(int DepartmentId)
        {
            return Json(context.Departments.Where(p => p.DepartmentId == DepartmentId).First());
        }

        [HttpGet]
        public JsonResult DeleteDepartments(int DepartmentId)
        {
            var SectionsOfThisDept = context.DeptSections.Where(p => p.DepartmentId == DepartmentId).ToList();
            var lecturerOfThisDept = context.Lecturers.Where(p => p.DepartmentId == DepartmentId).ToList();
            if ((SectionsOfThisDept.Count > 0) || (lecturerOfThisDept.Count > 0))
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;

                return Json(new ErrorMsgViewModel() { Error = "This Department Cannot be deleted as it is associated with some Sections" });
            }
            {
                var DelDept = context.Departments.Where(p => p.DepartmentId == DepartmentId).AsEnumerable();
                context.Departments.RemoveRange(DelDept);
                context.SaveChanges();

                return AllDepartments();
            }
        }

        [HttpGet]
        public JsonResult SearchDepartment(string searchText)
        {
            return Json(context.Departments.Where(p => p.Name.Contains(searchText)).ToList());

        }
        #endregion

        #region"Section"
        public ActionResult Section()
        {
            return PartialView();
        }

        [HttpPost]
        public JsonResult Section([FromBody]DeptSectionViewModel DeptSect)
        {
            if (ModelState.IsValid)
            {
                DeptSection deptSectSave = new DeptSection { SectionId = DeptSect.SectionId, Name = DeptSect.SectionName, DepartmentId = DeptSect.DepartmentId };
                if (DeptSect.SectionId > 0) //Edit updating
                    context.Entry(deptSectSave).State = EntityState.Modified;
                else
                    context.DeptSections.Add(deptSectSave);

                context.SaveChanges();
            }
            return AllSections();
        }

        [HttpGet]
        public JsonResult AllSections()
        {
            var Sections = from p in context.DeptSections
                           join q in context.Departments on p.DepartmentId equals q.DepartmentId
                           select new DeptSectionViewModel
                           {
                               SectionId = p.SectionId,
                               SectionName = p.Name,
                               DepartmentId = p.DepartmentId,
                               DepartmentName = q.Name
                           };
            return Json(Sections.ToList());
        }

        [HttpGet]
        public JsonResult GetDeptSectionByDeptId(int DepartmentId)
        {
            var Sections = from p in context.DeptSections
                           join q in context.Departments on p.DepartmentId equals q.DepartmentId
                           where p.DepartmentId == DepartmentId
                           select new DeptSectionViewModel
                           {
                               SectionId = p.SectionId,
                               SectionName = p.Name,
                               DepartmentId = p.DepartmentId,
                               DepartmentName = q.Name
                           };
            return Json(Sections.ToList());
        }

        [HttpGet]
        public JsonResult EditSection(int SectionId)
        {
            var editSection = (from p in context.DeptSections
                               join q in context.Departments on p.DepartmentId equals q.DepartmentId
                               where p.SectionId == SectionId
                               select new DeptSectionViewModel
                               {
                                   SectionId = p.SectionId,
                                   SectionName = p.Name,
                                   DepartmentId = p.DepartmentId,
                                   DepartmentName = q.Name
                               }).First();
            return Json(editSection);
        }


        [HttpGet]
        public JsonResult DeleteSection(int SectionId)
        {
            var studentOfThisSection = context.Students.Where(p => p.SectionId == SectionId).ToList();
            if (studentOfThisSection.Count > 0)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;

                return Json(new ErrorMsgViewModel() { Error = "This Section Cannot be deleted as it is associated with some Student" });
            }
            {
                var DelSection = context.DeptSections.Where(p => p.SectionId == SectionId).AsEnumerable();
                context.DeptSections.RemoveRange(DelSection);
                context.SaveChanges();

                return AllSections();
            }
        }

        [HttpGet]
        public JsonResult SearchSection(string searchText)
        {
            var searchedSection = (from p in context.DeptSections
                                   join q in context.Departments on p.DepartmentId equals q.DepartmentId
                                   where p.Name.Contains(searchText)
                                   select new DeptSectionViewModel
                                   {
                                       SectionId = p.SectionId,
                                       SectionName = p.Name,
                                       DepartmentId = q.DepartmentId,
                                       DepartmentName = q.Name

                                   }).ToList();
            return Json(searchedSection);
        }
        #endregion

        #region "Student"
        public ActionResult Student()
        {
            return PartialView();
        }

        [HttpPost]
        public JsonResult Student([FromBody]StudentViewModel studentVM)
        {
            if (ModelState.IsValid)
            {
                Student saveStudent = new Student
                {
                    StudentId = studentVM.StudentId,
                    Name = studentVM.StudentName,
                    SectionId = studentVM.SectionId,
                    DateofGraduaton = (studentVM.DateofGraduaton == null || (DateTime)studentVM.DateofGraduaton == DateTime.MinValue) ? null : studentVM.DateofGraduaton,
                    DateOfJoin = (studentVM.DateOfJoin == null || (DateTime)studentVM.DateOfJoin == DateTime.MinValue) ? null : studentVM.DateOfJoin
                };
                if (studentVM.StudentId > 0)
                    context.Entry(saveStudent).State = EntityState.Modified;
                else
                    context.Students.Add(saveStudent);

                context.SaveChanges();
            }
            return AllStudents();
        }

        [HttpGet]
        public JsonResult AllStudents()
        {
            var Students = (from p in context.Students
                            join q in context.DeptSections on p.SectionId equals q.SectionId
                            join r in context.Departments on q.DepartmentId equals r.DepartmentId
                            select new StudentViewModel
                            {
                                StudentId = p.StudentId,
                                StudentName = p.Name,
                                DepartmentId = q.DepartmentId,
                                DepartmentName = r.Name,
                                SectionId = p.SectionId,
                                SectionName = q.Name,
                                DateofGraduaton = p.DateofGraduaton,
                                DateOfJoin = p.DateOfJoin
                            }).ToList();
            return Json(Students);
        }


        [HttpGet]
        public JsonResult EditStudent(int StudentId)
        {
            var editStudent = (from p in context.Students
                               join q in context.DeptSections on p.SectionId equals q.SectionId
                               join r in context.Departments on q.DepartmentId equals r.DepartmentId
                               where p.StudentId == StudentId
                               select new StudentViewModel
                               {
                                   StudentId = p.StudentId,
                                   StudentName = p.Name,
                                   DepartmentId = q.DepartmentId,
                                   DepartmentName = r.Name,
                                   SectionId = p.SectionId,
                                   SectionName = q.Name,
                                   DateofGraduaton = p.DateofGraduaton,
                                   DateOfJoin = p.DateOfJoin
                               }).First();
            return Json(editStudent);
        }

        [HttpGet]
        public JsonResult DeleteStudent(int StudentId)
        {
            var DelStudent = context.Students.Where(p => p.StudentId == StudentId).AsEnumerable();
            context.Students.RemoveRange(DelStudent);
            context.SaveChanges();

            return AllStudents();
        }

        [HttpGet]
        public JsonResult SearchStudent(string searchText)
        {
            var searchedStudent = (from p in context.Students
                                   join q in context.DeptSections on p.SectionId equals q.SectionId
                                   join r in context.Departments on q.DepartmentId equals r.DepartmentId
                                   where p.Name.Contains(searchText)
                                   select new StudentViewModel
                                   {
                                       StudentId = p.StudentId,
                                       StudentName = p.Name,
                                       DepartmentId = q.DepartmentId,
                                       DepartmentName = r.Name,
                                       SectionId = p.SectionId,
                                       SectionName = q.Name,
                                       DateofGraduaton = p.DateofGraduaton,
                                       DateOfJoin = p.DateOfJoin
                                   }).ToList();
            return Json(searchedStudent);
        }

        #endregion

        #region "Leturer"

        public ActionResult Lecturer()
        {
            return PartialView();
        }

        [HttpPost]
        public JsonResult Lecturer([FromBody]LecturerViewModel lecturerVM)
        {
            if (ModelState.IsValid)
            {
                Lecturer lecturerSave = new Lecturer { LecturerId = lecturerVM.LecturerId, Name = lecturerVM.LecturerName, DepartmentId = lecturerVM.DepartmentId };
                if (lecturerVM.LecturerId > 0) //Edit updating
                    context.Entry(lecturerSave).State = EntityState.Modified;
                else
                    context.Lecturers.Add(lecturerSave);

                context.SaveChanges();
            }
            return AllLecturers();
        }

        [HttpGet]
        public JsonResult AllLecturers()
        {
            var Lecturers = from p in context.Lecturers
                            join q in context.Departments on p.DepartmentId equals q.DepartmentId
                            select new LecturerViewModel
                            {
                                LecturerId = p.LecturerId,
                                LecturerName = p.Name,
                                DepartmentId = p.DepartmentId,
                                DepartmentName = q.Name
                            };

            return Json(Lecturers.ToList());
        }


        [HttpGet]
        public JsonResult EditLecturer(int LecturerId)
        {
            var editLecturer = (from p in context.Lecturers
                                join q in context.Departments on p.DepartmentId equals q.DepartmentId
                                where p.LecturerId == LecturerId
                                select new LecturerViewModel
                                {
                                    LecturerId = p.LecturerId,
                                    LecturerName = p.Name,
                                    DepartmentId = p.DepartmentId,
                                    DepartmentName = q.Name
                                }).First();
            return Json(editLecturer);
        }


        [HttpGet]
        public JsonResult DeleteLecturer(int LecturerId)
        {
            var DelLecturer = context.Lecturers.Where(p => p.LecturerId == LecturerId).AsEnumerable();
            context.Lecturers.RemoveRange(DelLecturer);
            context.SaveChanges();

            return AllLecturers();
        }

        [HttpGet]
        public JsonResult SearchLecturer(string searchText)
        {
            var searchLecturer = (from p in context.Lecturers
                                join q in context.Departments on p.DepartmentId equals q.DepartmentId
                                where p.Name.Contains(searchText)
                                select new LecturerViewModel
                                {
                                    LecturerId = p.LecturerId,
                                    LecturerName = p.Name,
                                    DepartmentId = p.DepartmentId,
                                    DepartmentName = q.Name
                                }).ToList();
            return Json(searchLecturer);
        }

        #endregion
    }
}