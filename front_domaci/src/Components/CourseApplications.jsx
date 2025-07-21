import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import FakeUsers from "./FakeUsers";
import FakePolaganja from "./FakePolaganja"; 
import "./CourseApplications.css";

const CourseApplications = () => {
  const location = useLocation();
  const { course } = location.state || {};
  const [editingGradeFor, setEditingGradeFor] = useState(null);
  const [gradeInput, setGradeInput] = useState("");

  const [polaganja, setPolaganja] = useState(FakePolaganja);

  if (!course) {
    return <p>Kurs nije pronađen.</p>;
  }

  const applicationsWithUsers = course.prijave.map((app) => {
    const user = FakeUsers.find((u) => u.id === app.id);

    const polaganje = polaganja.find(
      (p) => p.kurs_id === course.id && p.student_id === app.id
    );

    return {
      ...app,
      user,
      polozio: polaganje ? polaganje.polozio : false,
      ocena: polaganje && polaganje.polozio ? polaganje.ocena : null,
    };
  });

  const statusOrder = { Prijavljen: 0, "Na Cekanju": 1, Odbijen: 2 };
  const sortedApps = [...applicationsWithUsers].sort(
    (a, b) => statusOrder[a.status] - statusOrder[b.status]
  );

  const handleAccept = (userId) => {
    console.log(`Prihvatio studenta sa ID: ${userId}`);
  };

  const handleReject = (userId) => {
    console.log(`Odbio studenta sa ID: ${userId}`);
  };

  const handleMarkPassed = (userId) => {
    setEditingGradeFor(userId);
    setGradeInput("");
  };

  const handleConfirmGrade = (userId) => {
    const grade = parseInt(gradeInput);
    if (isNaN(grade) || grade < 6 || grade > 10) {
      alert("Unesite validnu ocenu između 6 i 10.");
      return;
    }

    setPolaganja((prev) =>
      prev.map((p) => {
        if (p.student_id === userId && p.kurs_id === course.id) {
          return { ...p, položio: true, ocena: grade, polozio: true };
        }
        return p;
      })
    );

    if (!polaganja.some((p) => p.student_id === userId && p.kurs_id === course.id)) {
      setPolaganja((prev) => [
        ...prev,
        { student_id: userId, kurs_id: course.id, položio: true, ocena: grade, polozio: true },
      ]);
    }

    setEditingGradeFor(null);
    setGradeInput("");
  };

  return (
    <div className="applications-page">
      <Navigation />
      <div className="applications-container">
        <h2>Prijave za kurs: {course.naziv}</h2>
        <table className="applications-table">
          <thead>
            <tr>
              <th>Korisničko ime</th>
              <th>Email</th>
              <th>Status prijave</th>
              <th>Akcije</th>
              <th>Status polaganja</th>
              <th>Ocena</th>
            </tr>
          </thead>
          <tbody>
            {sortedApps.map((app, index) => {
              const isEditing = editingGradeFor === app.id;
              return (
                <tr key={index}>
                  <td>{app.user?.korisnicko_ime || "Nepoznato"}</td>
                  <td>{app.user?.email || "Nepoznato"}</td>
                  <td>{app.status}</td>

                  <td>
                    {app.status === "Na Cekanju" ? (
                      <>
                        <button onClick={() => handleAccept(app.id)}>Prihvati</button>{" "}
                        <button onClick={() => handleReject(app.id)}>Odbij</button>
                      </>
                    ) : app.status === "Prijavljen" ? (
                      app.polozio ? (
                        "-" 
                      ) : isEditing ? (
                        <>
                          <input
                            type="number"
                            min="6"
                            max="10"
                            value={gradeInput}
                            onChange={(e) => setGradeInput(e.target.value)}
                            placeholder="Unesi ocenu"
                          />
                          <button onClick={() => handleConfirmGrade(app.id)}>Potvrdi</button>
                          <button onClick={() => setEditingGradeFor(null)}>Otkaži</button>
                        </>
                      ) : (
                        <button onClick={() => handleMarkPassed(app.id)}>Položio</button>
                      )
                    ) : (
                      "-"
                    )}
                  </td>

                  <td>
                    {app.status === "Prijavljen"
                      ? app.polozio
                        ? "Položio"
                        : "Nije položio"
                      : "-"}
                  </td>

                  <td>{app.status === "Prijavljen" && app.polozio ? app.ocena : "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseApplications;
