import React, { useEffect, useState } from "react";
import SectionHeaders from "../SectionHeaders/SectionHeaders";
import ArticleBox from "../ArticleBox/ArticleBox";

export default function LastArticle() {
  const [articels, setArticels] = useState({});

  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles`)
      .then((res) => res.json())
      .then((allArticles) => {
        setArticels(allArticles);
      });
  }, []);

  return (
    <>
      <section className="articles">
        <div className="container">
          <SectionHeaders
            title={"آخرین مقالات"}
            desc={"آخرین مقالات برنامه نویسی"}
            btnTitle={"مشاهده مقالات"}
          />

          <div className="articles__content">
            <div className="row">
              {articels.length ? console.log("") : ""}

              {articels.length
                ? articels.map((item , id) => {
                    console.log("");
                    return <ArticleBox key={id} cover={item.cover} />
                  })
                : ""}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
