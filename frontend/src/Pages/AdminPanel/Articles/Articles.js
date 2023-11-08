import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";

export default function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles`)
      .then((res) => res.json())
      .then((allArticles) => {
        console.log(allArticles);
        setArticles(allArticles);
      });
  }, []);

  const removeArticle = (artclID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "آیا از حذف مطمینی",
      icon: "warning",
      buttons: ["NO", "Yes"],
    }).then((result) => {
      console.log(result)
      if (result) {
        fetch(`http://localhost:4000/v1/articles/${artclID}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorageData.token}` },
        }).then((res) => res.json());
      }
    });
  };

  return (
    <>
      <DataTable title="مقالات" />
      <table class="table">
        <thead>
          <tr>
            <th>شناسه</th>
            <th> مقاله </th>
            <th> لینک </th>
            <th> نویسنده </th>
            <th>ویرایش</th>
            <th>حذف</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article, index) => (
            <tr>
              <td>{index + 1} </td>
              <td>{article.title} </td>
              <td>{article.shortName} </td>
              <td>{article.creator.name} </td>
              <td>
                <button type="button" class="btn btn-primary edit-btn">
                  ویرایش
                </button>
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-danger delete-btn"
                  onClick={() => removeArticle(article._id)}
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
