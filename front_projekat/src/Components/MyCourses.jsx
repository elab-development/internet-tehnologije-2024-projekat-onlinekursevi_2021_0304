import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyCourses.css";
import { Link } from 'react-router-dom';
import Navigation from "./Navigation";

const MyCourses = () => {
  const [categories, setCategories] = useState([]); 
  const [courses, setCourses] = useState([]); 
  const [filteredCourses, setFilteredCourses] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState(null); 

  useEffect(() => {
    const authToken = sessionStorage.getItem("auth_token");

    
    axios
      .get("http://localhost:8000/api/users/moji-kursevi", {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        if (response.data && Array.isArray(response.data.data)) {
          setCourses(response.data.data); 
          setFilteredCourses(response.data.data); 
        } else {
          console.error("Nepravilna struktura podataka za kurseve:", response);
        }
      })
      .catch((error) => {
        console.error("Greška prilikom dobijanja kurseva:", error);
      });

   
    axios
      .get("http://localhost:8000/api/kategorije", {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        if (response.data && response.data.data) {
          setCategories(response.data.data); 
        } else {
          console.error("Nepravilna struktura podataka za kategorije:", response);
        }
      })
      .catch((error) => {
        console.error("Greška prilikom dobijanja kategorija:", error);
      });
  }, []);

  useEffect(() => {
  
    if (selectedCategory) {
      setFilteredCourses(
        courses.filter((course) =>
          course.kategorije.some((category) => category.id === selectedCategory)
        )
      );
    } else {
      setFilteredCourses(courses);
    }
  }, [selectedCategory, courses]);

  return (
    <div className="home-page">
      <Navigation />
      <div className="main-content">
     
        <div className="sidebar">
          <h3>Filteri</h3>
          <h4>Kategorije</h4>
          <ul>
            {categories.map((category) => (
              <li
                key={category.id}
                className={selectedCategory === category.id ? "selected" : ""}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category.id ? null : category.id
                  )
                }
              >
                {category.naziv}
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
              <Link to={`/kursevi/${course.id}`}>
              <div key={course.id} className="course-card">
                <img
                  src={course.putanja_do_slike || "https://via.placeholder.com/300"}
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
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
