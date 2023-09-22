import React from "react";
import SectionHeaders from "../SectionHeaders/SectionHeaders";

import "./PopularCourses.css";

export default function PopularCourses() {
  return (
    <>
      <div className="popular">
        <div className="container">
          <SectionHeaders title={"محبوب ترین دوره ها"} />
        </div>
      </div>
    </>
  );
}
