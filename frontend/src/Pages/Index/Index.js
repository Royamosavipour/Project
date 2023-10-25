import React from "react";
import Header from "../../Components/Header/Header";
import Landing from "../../Components/Landing/Landing";
import LastCourses from "../../Components/LastCourses/LastCourses";
import AboutUs from '../../Components/AboutUs/AboutUs'
import PopularCourses from "../../Components/PopularCourses/PopularCourses";
import PreSellCourses from "../../Components/PreSellCourses/PreSellCourses";
import LastArticle from "../../Components/LastArticle/LastArticle";
import Footer from "../../Components/Footer/Footer";
import CircleSpinner from '../../Components/CircleSpinner/CircleSpinner'

import "./Index.css";

export default function Index() {
  return (
    <div>
    <Header />
      <LastCourses />
      <AboutUs />
      <PopularCourses/>
      <PreSellCourses/>
      <LastArticle/>
      <Footer/>
      
    </div>
  );
}
