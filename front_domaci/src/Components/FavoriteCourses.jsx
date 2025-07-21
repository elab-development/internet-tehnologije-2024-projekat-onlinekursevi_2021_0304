import React, { useState, useEffect } from "react";
import "./FavoriteCourses.css";
import { useNavigate } from 'react-router-dom';
import Navigation from "./Navigation";
import useCourses from './useCourses'; 

const FavoriteCourses = () => {
  const [currentPage, setCurrentPage] = useState(1); 
  const coursesPerPage = 6; 
  const courses = useCourses(); 
  const [filteredCourses, setFilteredCourses] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = courses.filter(course => course.id % 2 !== 0);
    setFilteredCourses(filtered);
  }, [courses]);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const courseClickHandle = (course) => {
    navigate(`/kursevi/${course.id}`, { state: { course } });
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredCourses.length / coursesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="home-page">
      <Navigation />
      <div className="main-content">
        <div className="courses-section">
          <h2>Omiljeni kursevi</h2>
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
                    Kreirano: {new Date(course.kreirano).toLocaleDateString()} | Ažurirano: {new Date(course.azurirano).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Paginacija */}
          <div className="pagination">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={currentPage === number ? "selected" : ""}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCourses;
