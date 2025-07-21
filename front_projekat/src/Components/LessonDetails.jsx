import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import "./LessonDetails.css";


const LessonDetails = () => {
  const [lesson, setLesson] = useState(null); 
  const [videoSrc, setVideoSrc] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate();
  const { casId } = useParams();
  
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const authToken = window.sessionStorage.getItem("auth_token");

      
        const response = await axios.get(
          `http://localhost:8000/api/casovi/${casId}`,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );

        const lessonData = response.data.data;
        setLesson(lessonData);

        
        const videoMaterial = lessonData.materijali.find(
          (material) => material.tip === "video/mp4"
        );

        if (videoMaterial) {
          const videoResponse = await axios.get(videoMaterial.putanja, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            responseType: "blob", 
          });

          const videoFile = URL.createObjectURL(videoResponse.data);
          
          setVideoSrc(videoFile);
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
    
    setError("Niste prijavljeni na ovaj čas. Pristup zabranjen.");
    console.error("Pristup zabranjen:", error.response.data.message);
    setTimeout(() => {
      navigate(-1); 
    }, 2000); 
  } else {
   
    setError("Došlo je do greške pri učitavanju časa.");
    console.error(error);
  }
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [casId]);

  const handleOpenInNewTab = (material) => {
    try {
     
      const materialURL = material.putanja;

     
      const newWindow = window.open(materialURL, "_blank");

      if (newWindow) {
        newWindow.opener = null; 
      } else {
        console.error("Nije moguće otvoriti materijal u novom tabu.");
      }
    } catch (err) {
      console.error("Greška pri otvaranju materijala:", err);
    }
  };

  if (loading) {
    return <p>Učitavanje časa...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="lesson-details">
      <Navigation/>
      <h1>{lesson.naziv}</h1>
      <p>{lesson.opis}</p>
      <p>Kreator časa: {lesson.kreator_casa.korisnicko_ime} </p>

      {videoSrc && (
        <div className="video-container">
          <video controls width="800" src={videoSrc} />
        </div>
      )}

      <div className="materials-section">
        <h2>Dodatni materijali</h2>
        <ul>
          {lesson.materijali
            .filter((material) => material.tip !== "video/mp4")
            .map((material) => (
              <li key={material.id}>
                <button
                  className="material-link"
                  onClick={() => handleOpenInNewTab(material)}
                >
                  {material.naziv}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default LessonDetails;
