import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import TopBar from "../../Components/TopBar/TopBar";
import Footer from "../../Components/Footer/Footer";
import CourseBox from "../../Components/CourseBox/CourseBox";
import Pagination from "../../Components/Pagination/Pagination";
import { useParams } from "react-router-dom";

import "./Category.css";

export default function Category() {
  const { categoryName } = useParams();
  const [courses, setCourses] = useState([]);
  const [shownCourses, setShownCourses] = useState([]);
  const [status, setStatus] = useState("default");
  const [orderCourses, setOrderCourses] = useState([]);
  const [statusTitle, setStatusTitle] = useState("مرتب سازی پیش فرض");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
      .then((res) => res.json())
      .then((allcourses) => {
        console.log(allcourses);
        setCourses(allcourses);
        setOrderCourses(allcourses);
      });
  }, [categoryName]);

  useEffect(() => {
    switch (status) {
      case "free": {
        const filterFree = courses.filter((cours) => cours.price === 0);
        setOrderCourses(filterFree);
        break;
      }
      case "mony": {
        const filterMony = courses.filter((cours) => cours.price !== 0);
        setOrderCourses(filterMony);
        break;
      }
      case "last": {
        setOrderCourses(courses);
        break;
      }
      case "first": {
        const lastCours = courses.slice().reverse();
        setOrderCourses(lastCours);
        break;
      }
      default: {
        setOrderCourses(courses);
        break;
      }
    }
  }, [status]);

  const statusChangeHandeler = (event) => {
    setStatusTitle(event.target.textContent);
  };

  const searchValueChangeHandeler = (event) => {
    setSearchValue(event.target.value);
    const filterserach = courses.filter((cours) =>
      cours.name.includes(event.target.value));

    setOrderCourses(filterserach);
  };

  return (
    <>
      <TopBar />
      <Navbar />
      <section className="courses">
        <div className="container">
          {/* courseBoxses******************* */}
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {courses.length === 0 ? (
                  <>
                    <div className="alert alert-danger">
                      هنوز دوره ایی ثبت نگردیده است
                    </div>
                  </>
                ) : (
                  <>
                    <div className="courses-top-bar">
                      <div className="courses-top-bar__right">
                        <div className="courses-top-bar__row-btn courses-top-bar__icon--active">
                          <i className="fas fa-border-all courses-top-bar__icon"></i>
                        </div>
                        <div className="courses-top-bar__column-btn">
                          <i className="fas fa-align-left courses-top-bar__icon"></i>
                        </div>

                        <div className="courses-top-bar__selection">
                          <span className="courses-top-bar__selection-title">
                            {statusTitle}
                            <i className="fas fa-angle-down courses-top-bar__selection-icon"></i>
                          </span>
                          <ul className="courses-top-bar__selection-list">
                            <li className="courses-top-bar__selection-item courses-top-bar__selection-item--active">
                              مرتب سازی پیش فرض
                            </li>
                            <li
                              className="courses-top-bar__selection-item "
                              onClick={(event) => {
                                setStatus("free");
                                statusChangeHandeler(event);
                              }}
                            >
                              مرتب سازی براساس دوره های رایگان
                            </li>
                            <li
                              className="courses-top-bar__selection-item"
                              onClick={(event) => {
                                setStatus("mony");
                                statusChangeHandeler(event);
                              }}
                            >
                              مرتب سازی بر اساس م پولی
                            </li>
                            <li
                              className="courses-top-bar__selection-item"
                              onClick={(event) => {
                                setStatus("first");
                                statusChangeHandeler(event);
                              }}
                            >
                              مرتب سازی بر اساس اولین
                            </li>
                            <li
                              className="courses-top-bar__selection-item"
                              onClick={(event) => {
                                setStatus("last");
                                statusChangeHandeler(event);
                              }}
                            >
                              مرتب سازی بر اساس آخرین
                            </li>
                            <li
                              className="courses-top-bar__selection-item"
                              onClick={(event) => {
                                setStatus("cheap");
                                statusChangeHandeler(event);
                              }}
                            >
                              مرتب سازی بر اساس ارزان ترین
                            </li>
                            <li
                              className="courses-top-bar__selection-item"
                              onClick={(event) => {
                                setStatus("expensive");
                                statusChangeHandeler(event);
                              }}
                            >
                              مربت سازی بر اساس گران ترین
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="courses-top-bar__left">
                        <form action="#" className="courses-top-bar__form">
                          <input
                            type="text"
                            className="courses-top-bar__input"
                            placeholder="جستجوی دوره ..."
                            value={searchValue}
                            onChange={searchValueChangeHandeler}
                          />
                          <i className="fas fa-search courses-top-bar__search-icon"></i>
                        </form>
                      </div>
                    </div>
                    {shownCourses.length === 0 ? (
                      <div className="alert alert-danger">
                        هیچ دوره ایی برای {statusTitle} وجود ندارد
                      </div>
                    ) : (
                      <>
                        {shownCourses.map((cours) => (
                          <CourseBox {...cours} />
                        ))}
                      </>
                    )}
                  </>
                )}
                <Pagination
                  items={orderCourses}
                  itemCount={10}
                  pathname={`/category-info/${categoryName}`}
                  setshowncourses={setShownCourses}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
