import React, { useEffect, useState } from "react";
import SectionHeaders from "../SectionHeaders/SectionHeaders";
import CourseBox from "../CourseBox/CourseBox";

import "./LastCourses.css";

export default function LastCourses() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses`)
      .then((res) => res.json())
      .then((allCourses) => {
        console.log(allCourses);
        setCourses(allCourses)
      });
  }, []);

  return (
    <>
      <div className="courses">
        <div className="container">
          <SectionHeaders
            title={"جدیدترین دوره ها"}
            desc={"سکوی پرتاپ شما به سمت موفقیت"}
            btnTitle={"تمامی دوره ها"}
            bthref="courses"
          />
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {courses.splice(0,6).map((cours) => (
                  <CourseBox {...cours} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
