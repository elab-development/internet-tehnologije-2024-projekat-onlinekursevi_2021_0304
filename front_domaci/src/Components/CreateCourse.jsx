import React, { useState, useEffect } from 'react';
import './CreateCourse.css';
import Navigation from './Navigation';

const CreateCourse = () => {
  const [naziv, setNaziv] = useState('');
  const [opis, setOpis] = useState('');
  const [categories, setCategories] = useState([]);
  const [izabranaKategorija, setIzabranaKategorija] = useState('');
  const [slika, setSlika] = useState(null);

  useEffect(() => {
    setCategories([
      { id: 1, naziv: "Programiranje" },
        { id: 2, naziv: "Matematika" },
        { id: 3, naziv: "Fizika" },
        { id: 4, naziv: "Dizajn" },
        { id: 5, naziv: "Ekonomija" },
    ]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!izabranaKategorija) {
      console.error("Kategorija nije izabrana!");
      return;
    }

    console.log('Kurs kreiran:', { naziv, opis, kategorija: izabranaKategorija, slika });
  };

  return (
    <div className="napravi-kurs">
      <Navigation />
      <h1 className="page-title">Napravi Kurs</h1>
      <form onSubmit={handleSubmit} className="create-course-form">
        <div className="form-group">
          <label htmlFor="naziv" className="form-label">Naziv Kursa:</label>
          <input
            type="text"
            id="naziv"
            value={naziv}
            onChange={(e) => setNaziv(e.target.value)}
            placeholder="Unesite naziv kursa"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="opis" className="form-label">Opis Kursa:</label>
          <textarea
            id="opis"
            value={opis}
            onChange={(e) => setOpis(e.target.value)}
            placeholder="Unesite opis kursa"
            className="form-textarea"
          />
        </div>

        <div className="form-group">
          <label htmlFor="kategorija" className="form-label">Kategorija:</label>
          <select
            id="kategorija"
            value={izabranaKategorija}
            onChange={(e) => setIzabranaKategorija(e.target.value)}
            className="form-select"
          >
            <option value="">Izaberite kategoriju</option>
            {categories.map((kategorija) => (
              <option key={kategorija.id} value={kategorija.id}>
                {kategorija.naziv}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="slika" className="form-label">Slika Kursa:</label>
          <input
            type="file"
            id="slika"
            onChange={(e) => setSlika(e.target.files[0])}
            className="form-file-input"
          />
        </div>

        <button className="submit-button" type="submit">Kreiraj Kurs</button>
      </form>
    </div>
  );
};

export default CreateCourse;
