import React, { useState } from "react";
import Navigation from "./Navigation";
import "./Teachers.css";

const Teachers = () => {
    const [teachers, setTeachers] = useState([
        { id: 1, korisnicko_ime: "marko123", email: "marko.markovic@example.com" },
        { id: 2, korisnicko_ime: "jelena456", email: "jelena.petrovic@example.com" },
        { id: 3, korisnicko_ime: "ana789", email: "ana.jovanovic@example.com" },
        { id: 4, korisnicko_ime: "petar101", email: "petar@example.com" },
        { id: 5, korisnicko_ime: "ivana202", email: "ivana@example.com" },
        { id: 6, korisnicko_ime: "luka303", email: "luka@example.com" },
        { id: 7, korisnicko_ime: "milan404", email: "milan@example.com" },
        { id: 8, korisnicko_ime: "nina505", email: "nina@example.com" },
        { id: 9, korisnicko_ime: "david606", email: "david@example.com" },
        { id: 10, korisnicko_ime: "stefan707", email: "stefan@example.com" },
    ]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const handleDeleteClick = (teacher) => {
        setSelectedTeacher(teacher);
        setShowPopup(true);
    };

    const confirmDelete = () => {
        setTeachers(teachers.filter(t => t.id !== selectedTeacher.id)); 
        setShowPopup(false); 
    };

    return (
        <div className="teachers-body">
            <Navigation />
            <h1>Nastavnici</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Korisničko ime</th>
                        <th>Email</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map(teacher => (
                        <tr key={teacher.id}>
                            <td>{teacher.id}</td>
                            <td>{teacher.korisnicko_ime}</td>
                            <td>{teacher.email}</td>
                            <td>
                                <button onClick={() => handleDeleteClick(teacher)}>Obriši</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <p>Da li ste sigurni da želite da obrišete profesora "{selectedTeacher.korisnicko_ime}" i sve njegove kurseve?</p>
                        <button onClick={confirmDelete}>Da</button>
                        <button onClick={() => setShowPopup(false)}>Ne</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Teachers;
