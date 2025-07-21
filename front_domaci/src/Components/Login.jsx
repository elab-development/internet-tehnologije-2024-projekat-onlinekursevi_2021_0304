import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInput = (e) => {
    const newUserData = { ...userData };
    newUserData[e.target.name] = e.target.value;
    setUserData(newUserData);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    
    const email = userData.email.toLowerCase();
    const password = userData.password;
    if (email === 'mateja.radovic@example.com' && password === 'mateja') {
      window.sessionStorage.setItem('role', 'admin');
      navigate('/kursevi');
    } else if (email === 'marko.markovic@example.com' && password === 'marko') {
      window.sessionStorage.setItem('role', 'nastavnik');
      window.sessionStorage.setItem('ime', "Marko Marković");
      navigate('/kursevi');
    } else if (email === 'jovan@example.com' && password === 'jovan123'){
      window.sessionStorage.setItem('role', 'student');
      window.sessionStorage.setItem('id', 1);
      navigate('/kursevi');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Dobrodošli!</h1>
        <p className="login-subtitle">Prijavite se kako biste nastavili svoje obrazovanje.</p>
        {errorMessage && <p className="login-error">{errorMessage}</p>}
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              value={userData.email}
              onChange={handleInput}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Lozinka"
              value={userData.password}
              onChange={handleInput}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Prijavi se
          </button>
        </form>
        <p className="register-text">
          Nemate nalog?{' '}
          <button onClick={handleRegisterRedirect} className="register-link">
            Registrujte se
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
