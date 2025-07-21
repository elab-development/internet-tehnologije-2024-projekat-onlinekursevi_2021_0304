import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const role = sessionStorage.getItem('role'); 
  const navigation = useNavigate(); 


  const handleLogout = () => {
    sessionStorage.removeItem('auth_token'); 
    sessionStorage.removeItem('role'); 
    navigation('/'); 
  };


  const adminLinks = [
    { to: '/kursevi', label: 'Kursevi' },
    { to: '/nastavnici', label: 'Nastavnici' },
    { to: '/studenti', label: 'Studenti' },
    { to: '/kategorije', label: 'Kategorije Kurseva' },
  ];

  const professorLinks = [
    { to: '/kursevi', label: 'Kursevi' },
    { to: '/moji-kursevi', label: 'Moji Kursevi' },
    { to: '/napravi-kurs', label: 'Kreiraj Kurs' },
    { to: '/youtube', label: 'YouTube' },
  ];

  const studentLinks = [
    { to: '/kursevi', label: 'Kursevi' },
    { to: '/izabrani-kursevi', label: 'Izabrani Kursevi' },
    { to: '/youtube', label: 'YouTube' },
  ];

  let links = [];

 
  if (role === 'admin') links = adminLinks;
  else if (role === 'nastavnik') links = professorLinks;
  else if (role === 'student') links = studentLinks;

  return (
    <nav className="navigation">
      <ul className="nav-links">
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="nav-item">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

     
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Navigation;
