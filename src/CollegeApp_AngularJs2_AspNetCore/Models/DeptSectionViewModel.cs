using System.ComponentModel.DataAnnotations;

namespace CollegeApp_AngularJs2_AspNetCore.Models
{
    public class DeptSectionViewModel
    {
        public int SectionId { get; set; }
        [Required]
        public string SectionName { get; set; }
        [Required]
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
    }
}