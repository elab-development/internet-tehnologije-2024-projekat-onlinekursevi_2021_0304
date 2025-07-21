import './App.css';
  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import Register from './Components/Register';
import Courses from './Components/Courses';
import CourseDetails from './Components/CourseDetails';
const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />  
          <Route path="/register" element={<Register />} />
           <Route path="/kursevi" element={<Courses />} />
          <Route path="/kursevi/:courseId" element={<CourseDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
