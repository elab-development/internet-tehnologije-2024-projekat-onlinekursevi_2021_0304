import './App.css';
  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import Register from './Components/Register';
import Courses from './Components/Courses';
import CourseDetails from './Components/CourseDetails';
import AddLesson from './Components/AddLesson';
import LessonDetails from './Components/LessonDetails';
import MyCourses from './Components/MyCourses';
import FavoriteCourses from './Components/FavoriteCourses';
import CourseApplications from './Components/CourseApplications';
const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />  
          <Route path="/register" element={<Register />} />
           <Route path="/kursevi" element={<Courses />} />
          <Route path="/kursevi/:courseId" element={<CourseDetails />} />
             <Route path="/lesson/:lessonId" element={<LessonDetails />} />
          <Route path="/dodaj-lekciju" element={<AddLesson />} />
           <Route path="/moji-kursevi" element={<MyCourses />} />
          <Route path="/kurs-prijave" element={<CourseApplications />} />
          <Route path="/izabrani-kursevi" element={<FavoriteCourses />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
