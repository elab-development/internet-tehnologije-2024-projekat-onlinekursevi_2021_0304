import React from "react";
import { useLocation } from "react-router-dom";
import "./LessonDetails.css";
import Navigation from "./Navigation";

const LessonDetails = () => {
  const location = useLocation();
  const { lesson } = location.state || {}; 
  console.log(lesson);

  if (!lesson) {
    return <p>Čas nije pronađen.</p>;
  }

  return (
    <>
      <Navigation />
      <div className="lesson-details-page">
        <h1 className="lesson-title">{lesson.naziv}</h1>

       
        {lesson.video && (
          <div className="lesson-video">
            <h2>{lesson.video.title}</h2>
            <video width="90%" height="auto" controls>
              <source src={lesson.video.url} type="video/mp4" />
              Vaš pregledač ne podržava video tag.
            </video>
          </div>
        )}
        
        {lesson.images && lesson.images.length > 0 && (
          <div className="lesson-images">
            <h2>Slike</h2>
            <div className="image-gallery">
              {lesson.images.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image.src} alt={image.alt} />
                </div>
              ))}
            </div>
          </div>
        )}

        {lesson.pdfs && lesson.pdfs.length > 0 && (
          <div className="lesson-pdfs">
            <h2>PDF Dokumenti</h2>
            <ul className="pdf-list">
              {lesson.pdfs.map((pdf, index) => (
                <li key={index} className="pdf-item">
                  <a href={pdf.url} target="_blank" rel="noopener noreferrer">
                    {pdf.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default LessonDetails;
