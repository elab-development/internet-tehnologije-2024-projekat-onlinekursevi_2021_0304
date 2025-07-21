import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Navigation from "./Navigation";
import useCourses from "./useCourses"; 
import "./MyCourses.css";

const MyCourses = () => {
  const [filteredCourses, setFilteredCourses] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  const courses = useCourses();

  useEffect(() => {
    let filtered = courses.filter(course => course.kreator === "Marko Marković");
    if (selectedCategory) {
      filtered = filtered.filter(course => course.kategorija === selectedCategory);
    }

    setFilteredCourses(filtered);
  }, [courses, selectedCategory]);

  const handleCourseClick = (course) => {
    navigate(`/kursevi/${course.id}`, { state: { course } });
  };

  return (
    <div className="home-page">
      <Navigation />
      <div className="main-content">
        <div className="sidebar">
          <h3>Filteri</h3>
          <h4>Kategorije</h4>
          <ul>
            {["Programiranje", "Dizajn", "Matematika", "Fizika", "Ekonomija", "Računarske nauke", "Marketing", "Elektronika"].map((category) => (
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
          <button
            className="reset-button"
            onClick={() => setSelectedCategory(null)}
          >
            Resetuj filter
          </button>
        </div>

        <div className="courses-section">
          <h2>Moji kursevi</h2>
          <div className="courses-grid">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="course-card"
                onClick={() => handleCourseClick(course)}
              >
                <img
                  src={course.image || "https://via.placeholder.com/300"}
                  alt={course.title}
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
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
