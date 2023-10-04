import React, { useEffect, useState } from "react";

import "./Pagination.css";
import { Link, useParams } from "react-router-dom";

export default function Pagination({
  items,
  itemCount,
  pathname,
  setshowncourses,
}) {
  const [pagesCount, setPageCount] = useState(null);
  const { page } = useParams();
  

  useEffect(() => {
    console.log(items);
    let endIndex = itemCount * page;
    let startEndex = endIndex - itemCount;
    let paginationItem = items.slice(startEndex, endIndex);
    setshowncourses(paginationItem);

    let pagesNumbers = Math.ceil(items.length / itemCount);
    setPageCount(pagesNumbers);
  }, [page, items]);

  return (
    <>
      <div className="courses-pagination">
        <ul className="courses__pagination-list">
          {Array(pagesCount)
            .fill(0)
            .map((item, index) => (
              <li className="courses__pagination-item">
                {index + 1 === Number(page) ? (
                  <Link
                    to={`${pathname}/${index + 1}`}
                    className="courses__pagination-link courses__pagination-link--active"
                  >
                    {index + 1}
                  </Link>
                ) : (
                  <Link to={`${pathname}/${index + 1}`} className="courses__pagination-link">
                    {index + 1}
                  </Link>
                )}
              </li>
            ))}

        
          
        </ul>
      </div>
    </>
  );
}
