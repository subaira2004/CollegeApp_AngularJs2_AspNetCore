using System;
using System.ComponentModel.DataAnnotations;

namespace CollegeApp_AngularJs2_AspNetCore.Models
{
    public class StudentViewModel
    {
        public int StudentId { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        [Required]
        public int SectionId { get; set; }
        public string SectionName { get; set; }
        [Required]
        public string StudentName { get; set; }
        public DateTime? DateOfJoin { get; set; }
        public DateTime? DateofGraduaton { get; set; }
    }
}