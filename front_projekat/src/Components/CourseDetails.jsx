import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./CourseDetails.css";
import Navigation from "./Navigation";
import StudentSubscriptions from './StudentSubscriptions';

const CourseDetails = () => {
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authToken, setAuthToken] = useState(sessionStorage.getItem('auth_token'));
  const navigate = useNavigate();
  const [canAccessLessons, setCanAccessLessons] = useState(false);
  const [showSubscriptionsModal, setShowSubscriptionsModal] = useState(false);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/kursevi/${courseId}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        const courseData = response.data.data;
        const userId = sessionStorage.getItem('user_id');
        setCourseDetails(courseData);
        setLessons(courseData.casovi || []);
        setIsTeacher(courseData.predavac?.id == userId);
        setIsAdmin(sessionStorage.getItem('role') === 'admin' ? true : false);
        setCanAccessLessons(courseData.slusa_kurs === 'primljen' || isTeacher || isAdmin);
      } catch (error) {
        console.error("Greška prilikom učitavanja detalja kursa:", error);
      }
    };

    fetchCourseDetails();
  }, [courseId, navigate, authToken]);

  const handleAddLesson = () => {
    navigate(`/dodaj-lekciju/${courseId}`);
    console.log("Dodavanje časa");
  };

  const handleDeleteCourse = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/kursevi/${courseId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      console.log("Kurs obrisan");
      navigate("/courses");
    } catch (error) {
      console.error("Greška prilikom brisanja kursa:", error);
    }
  };

  const handleEnrollCourse = async () => {
    try {
      await axios.post('http://localhost:8000/api/prijave', {
        kurs_id: courseId
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      });
      alert('Uspešno ste se prijavili na kurs!');
      setCourseDetails(prevDetails => ({
        ...prevDetails,
        slusa_kurs: "u toku"
      }));
    } catch (error) {
      console.error('Greška prilikom prijave na kurs:', error);
      alert('Došlo je do greške prilikom prijave na kurs. Možda ste već prijavljeni.');
    }
  };

  const handleToggleFavorite = async () => {
    if (!courseDetails) return;

    const isCurrentlyFavorite = courseDetails.omiljeni_kurs;
    const url = isCurrentlyFavorite
      ? `http://localhost:8000/api/users/ukloniIzFavorita/${courseId}`
      : `http://localhost:8000/api/users/dodajUFavorite/${courseId}`;

    try {
      await axios.post(url, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      });
     
      setCourseDetails(prevDetails => ({
        ...prevDetails,
        omiljeni_kurs: !isCurrentlyFavorite
      }));
      alert(`Kurs je uspešno ${isCurrentlyFavorite ? 'uklonjen iz' : 'dodat u'} omiljene!`);
    } catch (error) {
      console.error(`Greška prilikom ${isCurrentlyFavorite ? 'uklanjanja iz' : 'dodavanja u'} omiljene:`, error);
      alert(`Došlo je do greške prilikom ${isCurrentlyFavorite ? 'uklanjanja iz' : 'dodavanja u'} omiljene.`);
    }
  };


  const seeSubscribers = () => {
    setShowSubscriptionsModal(true);
  };

  const closeSubscriptionsModal = () => {
    setShowSubscriptionsModal(false);
  };


  if (!courseDetails) {
    return <p>Učitavanje detalja kursa...</p>;
  }

  return (
    <div className="course-details-page">
      <Navigation />
      <div className="course-banner">
        <img
          src={courseDetails.putanja_do_slike || "https://via.placeholder.com/800x200"}
          alt={courseDetails.naziv}
        />
      </div>
      <div className="course-info">
        <h1>{courseDetails.naziv}</h1>
        <p className="course-description">{courseDetails.opis}</p>
        <p>
          <strong>Kreirano:</strong>{" "}
          {new Date(courseDetails.kreirano).toLocaleDateString()}
        </p>
        <p>
          <strong>Ažurirano:</strong>{" "}
          {new Date(courseDetails.azurirano).toLocaleDateString()}
        </p>
        <p>
          <strong>Predavač:</strong>{" "}
          {courseDetails.predavac?.korisnicko_ime || "Nepoznato"}
        </p>
        <p>
          <strong>Kategorije:</strong>{" "}
          {courseDetails?.kategorije.map((kategorija) => kategorija.naziv).join(", ")}
        </p>

       
        {courseDetails.omiljeni_kurs !== undefined && !isTeacher && !isAdmin && (
          <button
            onClick={handleToggleFavorite}
            className="favorite-course-button"
            style={{
              backgroundColor: courseDetails.omiljeni_kurs ? 'orange' : 'green',
              color: 'white',
              marginTop: '10px'
            }}
          >
            {courseDetails.omiljeni_kurs ? 'Ukloni iz omiljenih' : 'Dodaj u omiljene'}
          </button>
        )}




        {courseDetails.slusa_kurs === 'primljen' &&
          (
              (courseDetails.ocena === null || courseDetails.ocena <= 5) ?
             (
            <p className="course-grade"
              style={{ backgroundColor: 'red', color: 'white' }}>
              <strong>Niste jos polozili kurs</strong>
            </p>
          )
            
            :
           (
            <p className="course-grade"
              style={{ backgroundColor: 'green', color: 'white' }}>
              <strong>Položio kurs sa ocenom:</strong> {courseDetails.ocena}
            </p>
          ) )}

        {courseDetails.slusa_kurs === 'u toku' && (
          <p className="course-grade"
            style={{ backgroundColor: '#E4D00A', color: 'black' }}>
            <strong>Prijavili ste se na kurs. Sacekajte da vas nastavnik odobri da bi ste mogli da pogledate</strong>
          </p>

        )}


        {!courseDetails.slusa_kurs && !isTeacher && !isAdmin && (
          <button
            onClick={handleEnrollCourse}
            className="enroll-course-button"
            style={{ backgroundColor: 'red', color: 'white' }}
          >
            Prijavi se na kurs
          </button>
        )}

        {isTeacher && (
          <button
            onClick={seeSubscribers}
            className="subscription-course-button"
            style={{ backgroundColor: 'red', color: 'white' }}
          >
            Pregledaj prijave na kurs
          </button>
        )}


      </div>

      <div className="lessons-section">
        <h2>Časovi</h2>
        <ul>
          {lessons.length === 0 ? (
            <p className="no-lessons">Nema časova za ovaj kurs.</p>
          ) : (
            lessons.map((lesson) => (
              <li key={lesson.id} className="lesson-item">
          
                {canAccessLessons ? (
                  <Link to={`/kursevi/${courseId}/casovi/${lesson.id}`} className="lesson-link">
                    {lesson.naziv}
                  </Link>
                ) : (
                  <span className="lesson-link-disabled" title="Morate biti prijavljeni na kurs da biste pristupili časovima">
                    {lesson.naziv}
                  </span>
                )}
                {isTeacher || isAdmin ? (
                  <button
                    onClick={() => console.log(`Brisanje časa ${lesson.id}`)}
                    className="delete-lesson-button"
                  >
                    Obrisi čas
                  </button>
                ) : null}
              </li>
            ))
          )}
        </ul>

        {isTeacher && (
          <button onClick={handleAddLesson} className="add-lesson-button">
            Dodaj čas
          </button>
        )}
      </div>

      {(isTeacher || isAdmin) && (
        <button onClick={handleDeleteCourse} className="delete-course-button">
          Obrisi kurs
        </button>
      )}


      {showSubscriptionsModal && courseDetails.prijave && (
        <StudentSubscriptions
          initialSubscriptions={courseDetails.prijave}
          onClose={closeSubscriptionsModal}
          courseId={courseId}
        />
      )}
    </div>
  );
};

export default CourseDetails;