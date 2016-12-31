using System.ComponentModel.DataAnnotations;

namespace CollegeApp_AngularJs2_AspNetCore.Models
{
    public class LecturerViewModel
    {
        public int LecturerId { get; set; }
        [Required]
        public int DepartmentId { get; set; }
        [Required]
        public string LecturerName { get; set; }
        public string DepartmentName { get; set; }

    }
}