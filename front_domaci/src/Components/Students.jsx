import React, { useState } from "react";
import Navigation from "./Navigation";
import FakeUsers from "./FakeUsers"; 
import "./Students.css";

const Students = () => {
    const [students, setStudents] = useState(FakeUsers); 
    const [showPopup, setShowPopup] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleDeleteClick = (student) => {
        setSelectedStudent(student);
        setShowPopup(true);
    };

    const confirmDelete = () => {
        setStudents(students.filter((s) => s.id !== selectedStudent.id));
        setShowPopup(false);
    };

    return (
        <div className="students-body">
            <Navigation />
            <h1>Studenti</h1>
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
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.korisnicko_ime}</td>
                            <td>{student.email}</td>
                            <td>
                                <button onClick={() => handleDeleteClick(student)}>Obriši</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <p>Da li ste sigurni da želite da obrišete studenta "{selectedStudent.korisnicko_ime}"?</p>
                        <button onClick={confirmDelete}>Da</button>
                        <button onClick={() => setShowPopup(false)}>Ne</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Students;
