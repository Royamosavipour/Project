import React, { useEffect, useState } from "react";
import SectionHeaders from "../SectionHeaders/SectionHeaders";
import CourseBox from "../CourseBox/CourseBox";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import "./PreSellCourses.css";

export default function PreSellCourses() {
  const [preselCourses, setPreselCourses] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/presell`)
      .then((res) => res.json())
      .then((allpresellCourses) => {
        console.log(allpresellCourses);
        setPreselCourses(allpresellCourses);
      });
  }, []);
  return (
    <div>
      <div className="presell">
        <div className="container">
          <SectionHeaders title={"دوره های در حال پیش فروش"} desc={"تست"} />

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
                  {preselCourses.map((course) => (
                    <SwiperSlide>
                      <CourseBox {...course} isSlider={true} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
