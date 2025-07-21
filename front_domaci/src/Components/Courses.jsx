import React, { useState } from "react";
import "./Courses.css";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import useCourses from "./useCourses"; 

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;
  const navigate = useNavigate();

  const courses = useCourses(); 

  const filteredCourses = courses.filter((course) => {
    return (
      (!selectedCategory || course.kategorija === selectedCategory) &&
      (!selectedTeacher || course.kreator === selectedTeacher)
    );
  });

  const totalCourses = filteredCourses.length;
  const totalPages = Math.ceil(totalCourses / coursesPerPage);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const courseClickHandle = (course) => {
    navigate(`/kursevi/${course.id}`, { state: { course } });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="home-page">
      <Navigation />
      <div className="main-content">
        <div className="sidebar">
          <h3>Filteri</h3>
          <h4>Kategorije</h4>
          <ul>
            {["Programiranje", "Dizajn", "Matematika", "Fizika", 
              "Ekonomija", "Računarske nauke", "Marketing", "Elektronika"].map((category) => (
              <li
                key={category}
                className={selectedCategory === category ? "selected" : ""}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category ? null : category
                  )
                }
              >
                {category}
              </li>
            ))}
          </ul>
          <h4>Kreatori</h4>
          <ul>
            {["Marko Marković", "Jelena Petrović", "Ana Jovanović"].map((teacher) => (
              <li
                key={teacher}
                className={selectedTeacher === teacher ? "selected" : ""}
                onClick={() =>
                  setSelectedTeacher(
                    selectedTeacher === teacher ? null : teacher
                  )
                }
              >
                {teacher}
              </li>
            ))}
          </ul>
          <button
            className="reset-button"
            onClick={() => {
              setSelectedCategory(null);
              setSelectedTeacher(null);
            }}
          >
            Resetuj filtere
          </button>
        </div>

        <div className="courses-section">
          <h2>Svi kursevi</h2>
          <div className="courses-grid">
            {currentCourses.map((course) => (
              <div
                key={course.id}
                className="course-card"
                onClick={() => courseClickHandle(course)}
              >
                <img
                  src={course.image || "https://via.placeholder.com/300"}
                  alt={course.naziv}
                  className="course-image"
                />
                <div className="course-info">
                  <h3>{course.naziv}</h3>
                  <p>{course.opis}</p>
                  <p className="course-dates">
                    Kreirano: {new Date(course.kreirano).toLocaleDateString()} | 
                    Ažurirano: {new Date(course.azurirano).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Prethodna
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={currentPage === index + 1 ? "selected" : ""}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Sledeća
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
