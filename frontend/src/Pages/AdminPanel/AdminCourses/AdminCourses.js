import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";

export default function AdminCourses() {
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    getAllcourses();
  }, []);

  function getAllcourses() {
    const localstorageData = JSON.parse(localStorage.getItem("user"));
    fetch(`http://localhost:4000/v1/courses`, {
      headers: { Authorization: `Bearer ${localstorageData.token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllCourses(data);
      });
  }

  const removeCourse = (coursID) => {
    const localstorageData = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "آیا از حذف مطمینی؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http//localhost:4000/v1/courses/${coursID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localstorageData.token}`,
          },
        }).then((result) => {
          console.log(result);
          if (result.ok) {
            swal({
              title: "حذف با موفقیت انجام شد",
              buttons: "ok",
              icon: "success",
            }).then(() => getAllcourses());
          } else {
            swal({
              title: "حذف با موفقیت انجام نشد",
              buttons: "تلاش محدد",
              icon: "error",
            });
          }
        });
      }
    });
  };

  return (
    <>
      <DataTable title={"دوره ها"}>
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th> عنوان </th>
              <th>مبلغ</th>
              <th>وضعیت</th>
              <th>لینک</th>
              <th>مدرس</th>
              <th>دسته بندی</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {allCourses.map((cours, index) => (
              <tr>
                <td>{index + 1} </td>
                <td>{cours.name} </td>
                <td>
                  {cours.price === 0 ? "رایگان" : cours.price.toLocaleString()}{" "}
                </td>
                <td>
                  {cours.isComplete === 1 ? "تکمیل شده " : "در حال برگزاری"}{" "}
                </td>
                <td>{cours.shortName} </td>
                <td>{cours.creator} </td>
                <td>{cours.categoryID.title} </td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    onClick={() => removeCourse(cours._id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}
