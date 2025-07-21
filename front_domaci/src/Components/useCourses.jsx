import { useState, useEffect } from 'react';
import FakeCourses from './FakeCourses';

const useCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    
    setCourses(FakeCourses);
  }, []);

  return courses;
};

export default useCourses;
