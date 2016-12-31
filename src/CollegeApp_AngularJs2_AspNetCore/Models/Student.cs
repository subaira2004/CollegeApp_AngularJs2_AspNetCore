using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CollegeApp_AngularJs2_AspNetCore.Models
{
    public class Student
    {
        [Key]
        public int StudentId { get; set; }
        [Required]
        public int SectionId { get; set; }
        [Required]
        public string Name { get; set; }
        public DateTime? DateOfJoin { get; set; }
        public DateTime? DateofGraduaton { get; set; }

        [ForeignKey("DeptSectionId")]
        public virtual DeptSection DeptSection1 { get; set; }
    }
}