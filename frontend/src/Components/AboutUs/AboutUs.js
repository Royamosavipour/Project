import React from "react";
import SectionHeaders from "../SectionHeaders/SectionHeaders";
import AboutUsBox from "../AboutUsBox/AboutUsBox";

import "./AboutUs.css";

export default function AboutUs() {
  return (
    <>
      <div className="about-us">
        <div className="container">
          <SectionHeaders
            title={"ما چه کمکی بهتون میکنیم؟"}
            desc={"از اونجایی که آکادمی آموزشی سبزلرن یک آکادمی خصوصی هست"}
          />
        </div>
        <div className="container">
          <div className="row">
            <AboutUsBox
              title={"دوره های اختصاصی"}
              desc={"با پشتیبانی و کیفیت بالا ارائه میده !"}
            />
          </div>
        </div>
      </div>
    </>
  );
}
