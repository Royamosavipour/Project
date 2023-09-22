import React from "react";
import TopBar from "../../Components/TopBar/TopBar";
import Navbar from "../../Components/Navbar/Navbar";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
import Footer from "../../Components/Footer/Footer";
import CourseBox from "../../Components/CourseBox/CourseBox";

export default function Courses() {
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
                <CourseBox />
              </div>
            </div>
          </div>

          <div className="courses-pagination">
            <ul className="courses__pagination-list">
              <li className="courses__pagination-item">
                <a href="#" className="courses__pagination-link">
                  <i className="fas fa-long-arrow-alt-right courses__pagination-icon"></i>
                </a>
              </li>
              <li className="courses__pagination-item">
                <a
                  href="#"
                  className="courses__pagination-link courses__pagination-link--active"
                >
                  1
                </a>
              </li>
              <li className="courses__pagination-item">
                <a href="#" className="courses__pagination-link">
                  2
                </a>
              </li>
              <li className="courses__pagination-item">
                <a href="#" className="courses__pagination-link">
                  3
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
