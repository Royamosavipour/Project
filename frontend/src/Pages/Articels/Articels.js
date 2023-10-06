import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import TopBar from "../../Components/TopBar/TopBar";
import Footer from "../../Components/Footer/Footer";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
import Pagination from "../../Components/Pagination/Pagination";
import CourseBox from "../../Components/CourseBox/CourseBox";

import "./Articels.css";
import ArticleBox from "../../Components/ArticleBox/ArticleBox";

export default function Articels() {
  return (
    <>
      <TopBar />

      <Navbar />
      <BreadCrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          { id: 2, title:"تمامی مقالات", to: "/articles/1" },
        ]}
      />

      <section className="courses">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row">
              <ArticleBox 
                
              />
                
              </div>
            </div>
          </div>

          {/* <Pagination
            items={courses}
            itemCount={5}
            pathname={"/courses"}
            setshowncourses={setShownCourses}
          /> */}
        </div>
      </section>

      <Footer />
    </>
  );
}
