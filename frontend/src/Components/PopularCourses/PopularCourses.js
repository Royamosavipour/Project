import React, { useEffect, useState } from "react";
import SectionHeaders from "../SectionHeaders/SectionHeaders";
import { Swiper, SwiperSlide } from "swiper/react";
import CourseBox from "../CourseBox/CourseBox";
import "swiper/css";
import "swiper/css/pagination";

import "./PopularCourses.css";

export default function PopularCourses() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/popular`)
      .then((res) => res.json())
      .then((popularCourses) => {
        console.log(popularCourses);
        setCourses(popularCourses)
      });
  }, []);

  return (
    <>
      <div className="popular">
        <div className="container">
          <SectionHeaders title={"محبوب ترین دوره ها"} desc={"تست"} />

          <div className="courses-content">
            <div className="container">
              <div className="row">
                <Swiper
                loop={true}
                  slidesPerView={4}
                  spaceBetween={30}
                  pagination={{
                    clickable: true,
                  }}
                  className="mySwiper"
                >
                  {courses.map(cours=>(
                  <SwiperSlide>
                    <CourseBox {...cours} isSlider={true} />
                  </SwiperSlide>

                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
