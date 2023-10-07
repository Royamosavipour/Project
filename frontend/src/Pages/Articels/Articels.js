import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import TopBar from "../../Components/TopBar/TopBar";
import Footer from "../../Components/Footer/Footer";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
import Pagination from "../../Components/Pagination/Pagination";
import CourseBox from "../../Components/CourseBox/CourseBox";
import ArticleBox from "../../Components/ArticleBox/ArticleBox";

import "./Articels.css";

export default function Articels() {
  const [articles, setArticles] = useState([]);
  const [shownArticles, setShownArticles] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles`)
      .then((res) => res.json())
      .then((allArticles) => {
        console.log(allArticles);
        setArticles(allArticles);
      });
  },[]);
  return (
    <>
      <TopBar />
      <Navbar />
      <BreadCrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          { id: 2, title: "تمامی مقالات", to: "/articles/1" },
        ]}
      />

      <section className="courses">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {shownArticles.map(article=>(
                <ArticleBox {...article} />

                ))}
              </div>
            </div>
          </div>

          <Pagination
            items={articles}
            itemCount={3}
            pathname={"/articels"}
            setshowncourses={setShownArticles}
          />
        </div>
      </section>

      <Footer />
    </>
  );
}
