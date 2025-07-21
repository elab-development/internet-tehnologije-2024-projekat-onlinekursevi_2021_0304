import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CourseDetails.css";
import Navigation from "./Navigation";
import FakePolaganja from "./FakePolaganja";

const PolaganjeStatus = ({ polozio, ocena }) => {
  return (
    <label style={{ fontWeight: "bold", color: polozio ? "green" : "red" }}>
      {polozio ? "Položio si kurs sa ocenom " + ocena : "Još uvek nisi položio kurs"}
    </label>
  );
};

const CourseDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { course } = location.state || {};

  if (!course) {
    return (
      <p>
        Kurs nije pronađen. Vratite se na{" "}
        <a href="/kursevi">listu kurseva</a>.
      </p>
    );
  }

  const role = sessionStorage.getItem("role");
  const imeNastavnika = sessionStorage.getItem("ime");
  const userId = Number(sessionStorage.getItem("id"));

  const userApplications = course.prijave?.filter((p) => p.id === userId) || [];
  const lastApplication = userApplications[userApplications.length - 1];
  const shouldShowApplyButton =
    userApplications.length === 0 || lastApplication?.status === "Odbijen";

  const isAccepted = userApplications.some((app) => app.status === "Prijavljen");

  const polaganje = FakePolaganja.find(
    (p) => p.kurs_id === course.id && p.student_id === userId
  );

  const polozio = polaganje ? polaganje.polozio : false;
  const ocena = polaganje?.ocena || null;

  const handleApplyCourse = () => {
    window.alert("Poslata je prijava za kurs!");
  };

  const handleAddLesson = () => {
    navigate("/dodaj-lekciju");
  };

  const handleDeleteCourse = () => {
    navigate("/courses");
  };

  const handleFavoriteCourse = () => {
    window.alert("Kurs je dodat u omiljene!");
  };

  const handleDeleteLesson = (lessonId) => {
    const updatedLessons = course.casovi.filter(
      (lesson) => lesson.id !== lessonId
    );
    console.log("Ažurirani časovi:", updatedLessons);
  };

  const handleLessonClick = (lesson) => {
    if (role === "student") {
      if (!isAccepted) {
        window.alert(
          "Nemate pristup ovom času jer još niste primljeni na kurs."
        );
        return;
      }
    }

    navigate(`/lesson/${lesson.id}`, { state: { lesson } });
  };

  return (
    <div className="course-details-page">
      <Navigation />
      <div className="course-banner">
        <img
          src={course.image || "https://via.placeholder.com/800x200"}
          alt={course.naziv}
        />
      </div>
      <div className="course-info">
        <h1>{course.naziv}</h1>
        <p className="course-description">{course.opis}</p>
        <p>
          <strong>Kreirano:</strong>{" "}
          {new Date(course.kreirano).toLocaleDateString()}
        </p>
        <p>
          <strong>Ažurirano:</strong>{" "}
          {new Date(course.azurirano).toLocaleDateString()}
        </p>
        {role === "student" && shouldShowApplyButton && (
          <button onClick={handleApplyCourse} className="apply-course-button">
            Prijavi se
          </button>
        )}
        {(role === "nastavnik" && imeNastavnika === course.kreator) ||
        role === "admin" ? (
          <button
            onClick={() => navigate("/kurs-prijave", { state: { course } })}
            className="view-applications-button"
          >
            Prikaz prijava za kurs
          </button>
        ) : null}
      </div>

      <div className="lessons-section">
        <h2>Časovi</h2>
        <ul>
          {course.casovi.length === 0 ? (
            <p className="no-lessons">Nema časova za ovaj kurs.</p>
          ) : (
            course.casovi.map((lesson) => (
              <li key={lesson.id} className="lesson-item">
                <button
                  onClick={() => handleLessonClick(lesson)}
                  className="lesson-link"
                >
                  <p>{lesson.naziv}</p>
                </button>
                {(role === "nastavnik" && imeNastavnika === course.kreator) ||
                role === "admin" ? (
                  <button
                    onClick={() => handleDeleteLesson(lesson.id)}
                    className="delete-lesson-button"
                  >
                    Obrisi čas
                  </button>
                ) : null}
              </li>
            ))
          )}
        </ul>

        {role === "nastavnik" && imeNastavnika === course.kreator && (
          <button onClick={handleAddLesson} className="add-lesson-button">
            Dodaj čas
          </button>
        )}

        {role === "student" && isAccepted && (
          <div style={{ marginTop: "20px" }}>
            <PolaganjeStatus polozio={polozio} ocena={ocena} />
          </div>
        )}
      </div>

      {(role === "nastavnik" && imeNastavnika === course.kreator) ||
      role === "admin" ? (
        <button onClick={handleDeleteCourse} className="delete-course-button">
          Obrisi kurs
        </button>
      ) : null}

      {role === "student" && (
        <button onClick={handleFavoriteCourse} className="favorite-course-button">
          Dodaj kurs u omiljene
        </button>
      )}
    </div>
  );
};

export default CourseDetails;
