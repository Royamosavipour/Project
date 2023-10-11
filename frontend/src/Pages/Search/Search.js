import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import TopBar from "../../Components/TopBar/TopBar";
import Footer from "../../Components/Footer/Footer";
import SectionHeaders from "../../Components/SectionHeaders/SectionHeaders";
import { useParams } from "react-router-dom";
import CourseBox from "../../Components/CourseBox/CourseBox";
import ArticleBox from "../../Components/ArticleBox/ArticleBox";

export default function Search() {
  const [courses, setcourses] = useState([]);
  const [articles, setArticles] = useState([]);
  const { value } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/v1/search/${value}`)
      .then((res) => res.json())
      .then((allData) => {
        console.log(allData);
        setArticles(allData.allResultArticles);
        setcourses(allData.allResultCourses);
      });
  }, []);

  return (
    <>
      <TopBar />
      <Navbar />
      <div className="courses">
        <div className="container">
          <SectionHeaders
            title={"نتیجه دوره برای جستجوی شما"}
            desc={"سکوی پرتاپ شما به سمت موفقیت"}
          />
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {courses.length === 0 ? (
                  <div className="alert alert-dark">دوره ایی یافت نگردید</div>
                ) : (
                  <>
                  {
                    courses.map(cours=>(
                        <CourseBox key={cours.id} {...cours} />
                    ))
                  }
                  
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="courses">
        <div className="container">
          <SectionHeaders
            title={"نتیجه مقاله برای جستجوی شما"}
            desc={'پیش به سوی ارتقاع دانش'}
          />
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {articles.length === 0 ? (
                  <div className="alert alert-dark">مقاله ایی یافت نگردید</div>
                ) : (
                  <>
                  {
                    courses.map(article=>(
                        <ArticleBox key={article.id} {...article} />
                    ))
                  }
                  
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
