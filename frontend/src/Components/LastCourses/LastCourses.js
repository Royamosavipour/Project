import React from "react";
import SectionHeaders from "../SectionHeaders/SectionHeaders";
import CourseBox from "../CourseBox/CourseBox";

import "./LastCourses.css";

export default function LastCourses() {
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
                <CourseBox />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
