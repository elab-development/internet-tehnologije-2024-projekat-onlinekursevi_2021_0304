import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentSubscriptions.css'; 


const StudentSubscriptions = ({ initialSubscriptions, onClose, courseId }) => {
  const [authToken, setAuthToken] = useState(sessionStorage.getItem('auth_token'));

  const [subscriptions, setSubscriptions] = useState(
    initialSubscriptions.map(sub => ({
      ...sub,
      displayOcena: sub.ocena === null || sub.ocena === 5 ? 5 : sub.ocena,
    }))
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    setSubscriptions(initialSubscriptions.map(sub => ({
      ...sub,
      displayOcena: sub.ocena === null || sub.ocena === 5 ? 5 : sub.ocena,
    })));
  }, [initialSubscriptions]);


  const handleAction = async (id, newZahtev, newPolozio, newOcena) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('_method', 'PUT');
      formData.append('zahtev', newZahtev);
      formData.append('polozio',newPolozio?1:0);
      formData.append('ocena', newOcena);
      console.log(newZahtev);
      console.log(newPolozio);
      console.log(newOcena);

      await axios.post(`http://localhost:8000/api/prijave/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setSubscriptions(prevSubs =>
        prevSubs.map(sub =>
          sub.id === id ? { ...sub, zahtev: newZahtev, polozio: newPolozio, ocena: newOcena, displayOcena: newOcena } : sub
        )
      );
    } catch (err) {
      console.error("Greška prilikom ažuriranja prijave:", err);
      setError("Došlo je do greške prilikom ažuriranja prijave.");
    } finally {
      setLoading(false);
    }
  };

  const handleOcenaChange = (id, value) => {
    setSubscriptions(prevSubs =>
      prevSubs.map(sub =>
        sub.id === id ? { ...sub, displayOcena: parseInt(value) } : sub
      )
    );
  };

    const handlePolozioToggle = (id) => {
    setSubscriptions(prevSubs => {
      const updatedSubscriptions = prevSubs.map(sub =>
        sub.id === id ? { ...sub, polozio: !sub.polozio } : sub
      );
      const updatedSub = updatedSubscriptions.find(sub => sub.id === id);
      if (updatedSub) {
        handleSave(updatedSub); 
      }
      return updatedSubscriptions;
    });
  };

  const handleSave = async (subscription) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('_method', 'PUT');
      formData.append('zahtev', subscription.zahtev);
      formData.append('polozio', subscription.polozio?1:0);
      formData.append('ocena', subscription.displayOcena);
      console.log(formData);

      await axios.post(`http://localhost:8000/api/prijave/${subscription.id}`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
    
    } catch (err) {
      console.error("Greška prilikom čuvanja promena:", err);
      setError("Došlo je do greške prilikom čuvanja promena.");
    } finally {
      setLoading(false);
    }
  };

  const getRowClass = (subscription) => {
    if (subscription.zahtev === 'primljen') return 'row-green';
    if (subscription.zahtev === 'u toku') return 'row-yellow';
    if (subscription.zahtev === 'odbijen') return 'row-red';
    return '';
  };

  if (loading) return <div className="loading-overlay">Učitavanje...</div>; 
  if (error) return <div className="error-message">Greška: {error}</div>;

  return (
    <div className="subscriptions-overlay">
      <div className="subscriptions-modal">
        <h2>Prijave studenata na kurs</h2>
        <button className="close-button" onClick={onClose}>&times;</button>
        {subscriptions.length === 0 ? (
          <p>Nema prijava za ovaj kurs.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Ime i prezime studenta</th>
                <th>Email</th>
                <th>Zahtev</th>
                <th>Položio</th>
                <th>Ocena</th>
                <th>Akcije</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub) => (
                <tr key={sub.id} className={`${getRowClass(sub)} ${sub.polozio ? 'bold-row' : ''}`}>
                  <td>{sub.student.name}</td>
                  <td>{sub.student.email}</td>
                  <td>{sub.zahtev}</td>
                  <td>
                    {sub.polozio ? 'Položio' : 'Nije položio'}
                
                    {sub.zahtev === 'primljen' && !sub.polozio && (
                      <input
                        type="checkbox"
                        checked={sub.polozio}
                        onChange={() => handlePolozioToggle(sub.id)}
                        disabled={loading} 
                      />
                    )}
                  </td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={sub.displayOcena}
                      onChange={(e) => handleOcenaChange(sub.id, e.target.value)}
                     
                      readOnly={!(sub.zahtev === 'primljen' && !sub.polozio)}
                      style={{ border: !(sub.zahtev === 'primljen' && !sub.polozio) ? 'none' : '1px solid #ccc' }}
                      disabled={loading} 
                    />
                  </td>
                  <td>
                    {sub.zahtev === 'u toku' && (
                      <button
                        onClick={() => handleAction(sub.id, 'primljen', sub.polozio, sub.displayOcena)}
                        disabled={loading} 
                      >
                        Primi na kurs
                      </button>
                    )}
                    {(sub.zahtev === 'u toku' || sub.zahtev === 'primljen') && (
                      <button
                        onClick={() => handleAction(sub.id, 'odbijen', sub.polozio, sub.displayOcena)}
                        disabled={loading} 
                      >
                        Odbij
                      </button>
                    )}
                   
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StudentSubscriptions;