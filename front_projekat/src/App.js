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
import VideoPlayer from './Components/VideoPlayer';
import MaterijalPage from './Components/MaterialPage';
import Youtube from './Components/Youtube';
import Teachers from './Components/Teachers';
import Students from './Components/Students';
const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />  
          <Route path="/register" element={<Register />} />
          <Route path="/kursevi" element={<Courses />} />
          <Route path="/kursevi/:courseId" element={<CourseDetails />} />
            <Route path="/kursevi/:courseId/casovi/:casId" element={<LessonDetails />} />
          <Route path="/dodaj-lekciju/:courseId" element={<AddLesson />} />
          <Route path="/moji-kursevi" element={<MyCourses />} />
          <Route path="/izabrani-kursevi" element={<FavoriteCourses />} />
            <Route path="/video" element={<MaterijalPage />} />
          <Route path="/video-player" element={<VideoPlayer/>}/>
           <Route path="/youtube" element={<Youtube />} />
             <Route path="/nastavnici" element={<Teachers />} />
          <Route path="/studenti" element={<Students />} />
             <Route path="/kategorije" element={<Categories />} />
          <Route path="/napravi-kurs" element={<CreateCourse />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
