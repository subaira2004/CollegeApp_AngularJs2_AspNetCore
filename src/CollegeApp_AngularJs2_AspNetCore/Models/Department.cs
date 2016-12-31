using System.ComponentModel.DataAnnotations;

namespace CollegeApp_AngularJs2_AspNetCore.Models
{
    public class Department
    {
        [Key]
        public int DepartmentId { get; set; }
        [Required]
        public string Name { get; set; }
    }
}