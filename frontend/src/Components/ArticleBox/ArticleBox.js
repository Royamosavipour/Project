import React, { useState } from "react";
import CircleSpinner from "../CircleSpinner/CircleSpinner";

import "./ArticleBox.css";

export default function ArticleBox({ title, description, cover }) {
  const [isShowImg, setIsShowImg] = useState(false);
  const onloadImg = () => setIsShowImg(true);
  return (
    <>
      <div className="col-4">
        <div className="article-card">
          <div className="article-card__header">
            <a href="#" className="article-card__link-img">
              <img
              
                src={`http://localhost:4000/courses/covers/${cover}`}
                className="article-card__img"
                alt="Article Cover"
                onLoad={onloadImg}
              />
              {!isShowImg && <CircleSpinner />}
            </a>
          </div>
          <div className="article-card__content">
            <a href="#" className="article-card__link">
              {description}
            </a>
            <p className="article-card__text">{title}</p>
            <a href="#" className="article-card__btn">
              بیشتر بخوانید
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
