import React from "react";
import SectionHeaders from "../SectionHeaders/SectionHeaders";
import ArticleBox from "../ArticleBox/ArticleBox";

export default function LastArticle() {
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
              <ArticleBox
                cover={"images/blog/1.jpg"}
                desc={"نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون"}
                title={
                  "زبان پایتون هم مانند دیگر زبان­های برنامه نویسی رایج، دارای کتابخانه های مختلفی برای تسریع..."
                }
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
