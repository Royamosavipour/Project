import React, { useEffect, useState } from "react";
import TopBar from "../../Components/TopBar/TopBar";
import Navbar from "../../Components/Navbar/Navbar";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
import Footer from "../../Components/Footer/Footer";
import CourseBox from "../../Components/CourseBox/CourseBox";
import Pagination from "../../Components/Pagination/Pagination";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [shownCourses, setShownCourses] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses`)
      .then((res) => res.json())
      .then((allCourses) => {
        console.log(allCourses);
        setCourses(allCourses);
      });
  }, []);

  return (
    <>
      <TopBar />
      <Navbar />
      <BreadCrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          { id: 2, title: "فرانت اند", to: "/frontend" },
        ]}
      />

      <section className="courses">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {shownCourses.map((course,id) => (
                  <CourseBox key={id} {...course} />
                ))}
              </div>
            </div>
          </div>

          <Pagination
            items={courses}
            itemCount={5}
            pathname={"/courses"}
            setshowncourses={setShownCourses}
          />
        </div>
      </section>

      <Footer />
    </>
  );
}
