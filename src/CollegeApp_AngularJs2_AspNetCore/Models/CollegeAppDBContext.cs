namespace CollegeApp_AngularJs2_AspNetCore.Models
{
    using Microsoft.EntityFrameworkCore;

    public class CollegeAppDBContext : DbContext
    {

        // Your context has been configured to use a 'CollegeAppEDM' connection string from your application's 
        // configuration file (App.config or Web.config). By default, this connection string targets the 
        // 'CollegeApp.Models.CollegeAppEDM' database on your LocalDb instance. 
        // 
        // If you wish to target a different database and/or database provider, modify the 'CollegeAppEDM' 
        // connection string in the application configuration file.
        public CollegeAppDBContext(DbContextOptions<CollegeAppDBContext> options)
            : base(options)
        {
        }

      
                
        

        // Add a DbSet for each entity type that you want to include in your model. For more information 
        // on configuring and using a Code First model, see http://go.microsoft.com/fwlink/?LinkId=390109.

        // public virtual DbSet<MyEntity> MyEntities { get; set; }
        public virtual DbSet<Department> Departments { get; set; }
        public virtual DbSet<DeptSection> DeptSections { get; set; }
        public virtual DbSet<Student> Students { get; set; }
        public virtual DbSet<Lecturer> Lecturers { get; set; }
    }

    
}