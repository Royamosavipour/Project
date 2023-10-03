import React, { useEffect, useState } from "react";

import "./Pagination.css";
import { useParams } from "react-router-dom";

export default function Pagination({
  items,
  itemCount,
  pathname,
  setshowncourses,
}) {
  const [pageCount, setPageCount] = useState(null);
  const { page } = useParams();


  useEffect(() => {
    console.log(items)
    let endIndex = itemCount * page;
    let startEndex = endIndex - itemCount;
    let paginationItem = items.slice(startEndex, endIndex);
    setshowncourses(paginationItem);

    let pagesNumbers=Math.ceil(items.length/itemCount)
    setPageCount(pagesNumbers)
  }, [page,items]);

  return (
    <>
      <div className="courses-pagination">
        <ul className="courses__pagination-list">
          <li className="courses__pagination-item">
            <a href="#" className="courses__pagination-link">
              <i className="fas fa-long-arrow-alt-right courses__pagination-icon"></i>
            </a>
          </li>
          <li className="courses__pagination-item">
            <a href="#" className="courses__pagination-link">
              1
            </a>
          </li>
          <li className="courses__pagination-item">
            <a href="#" className="courses__pagination-link">
              2
            </a>
          </li>
          <li className="courses__pagination-item">
            <a
              href="#"
              className="courses__pagination-link courses__pagination-link--active"
            >
              3
            </a>
          </li>
          <li className="courses__pagination-item">
            <a href="#" className="courses__pagination-link">
              <i className="fas fa-long-arrow-alt-left courses__pagination-icon"></i>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
