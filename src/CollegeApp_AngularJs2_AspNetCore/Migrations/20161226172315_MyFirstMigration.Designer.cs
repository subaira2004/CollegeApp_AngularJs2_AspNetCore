using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using CollegeApp_AngularJs2_AspNetCore.Models;

namespace CollegeApp_AngularJs2_AspNetCore.Migrations
{
    [DbContext(typeof(CollegeAppDBContext))]
    [Migration("20161226172315_MyFirstMigration")]
    partial class MyFirstMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.0-rtm-22752")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("CollegeApp_AngularJs2_AspNetCore.Models.Department", b =>
                {
                    b.Property<int>("DepartmentId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("DepartmentId");

                    b.ToTable("Departments");
                });

            modelBuilder.Entity("CollegeApp_AngularJs2_AspNetCore.Models.DeptSection", b =>
                {
                    b.Property<int>("SectionId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("DepartmentId");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("SectionId");

                    b.HasIndex("DepartmentId");

                    b.ToTable("DeptSections");
                });

            modelBuilder.Entity("CollegeApp_AngularJs2_AspNetCore.Models.Lecturer", b =>
                {
                    b.Property<int>("LecturerId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("DepartmentId");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("LecturerId");

                    b.HasIndex("DepartmentId");

                    b.ToTable("Lecturers");
                });

            modelBuilder.Entity("CollegeApp_AngularJs2_AspNetCore.Models.Student", b =>
                {
                    b.Property<int>("StudentId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("DateOfJoin");

                    b.Property<DateTime?>("DateofGraduaton");

                    b.Property<int?>("DeptSectionId");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<int>("SectionId");

                    b.HasKey("StudentId");

                    b.HasIndex("DeptSectionId");

                    b.ToTable("Students");
                });

            modelBuilder.Entity("CollegeApp_AngularJs2_AspNetCore.Models.DeptSection", b =>
                {
                    b.HasOne("CollegeApp_AngularJs2_AspNetCore.Models.Department", "Department")
                        .WithMany()
                        .HasForeignKey("DepartmentId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("CollegeApp_AngularJs2_AspNetCore.Models.Lecturer", b =>
                {
                    b.HasOne("CollegeApp_AngularJs2_AspNetCore.Models.Department", "Department")
                        .WithMany()
                        .HasForeignKey("DepartmentId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("CollegeApp_AngularJs2_AspNetCore.Models.Student", b =>
                {
                    b.HasOne("CollegeApp_AngularJs2_AspNetCore.Models.DeptSection", "DeptSection1")
                        .WithMany()
                        .HasForeignKey("DeptSectionId");
                });
        }
    }
}
