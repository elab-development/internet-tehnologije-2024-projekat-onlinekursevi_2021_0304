import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [role, setRole] = useState('Student');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setError('Lozinke se ne poklapaju.');
      return;
    }

    console.log('Registracija uspešna za:', username, email, role);
    alert(`Uspešno ste registrovali nalog!\n\nIme: ${username}\nEmail: ${email}\nUloga: ${role}`);
    navigate('/');
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Kreirajte nalog</h2>
        {error && <p className="register-error">{error}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Korisničko ime"
            className="register-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="register-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Lozinka"
            className="register-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Potvrdite lozinku"
            className="register-input"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
          <select
            className="register-input"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Nastavnik">Nastavnik</option>
            <option value="Student">Student</option>
          </select>
          <button type="submit" className="register-button">
            Registrujte se
          </button>
        </form>
        <p className="register-footer">
          Već imate nalog? <a href="/">Prijavite se</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
