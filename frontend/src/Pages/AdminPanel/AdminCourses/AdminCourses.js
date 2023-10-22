import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";

export default function AdminCourses() {
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    const localstorageData=JSON.parse(localStorage.getItem('user'))
    fetch(`http://localhost:4000/v1/courses`,
    {headers:{'Authorization':`Bearer ${localstorageData.token}`}})
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAllCourses(data)

      });
  }, []);

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
                <td>{cours.price===0?'رایگان':cours.price.toLocaleString()} </td>
                <td>{cours.isComplete===1?'تکمیل شده ':'در حال برگزاری'} </td>
                <td>{cours.shortName} </td>
                <td>{cours.creator} </td>
                <td>{cours.categoryID.title} </td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-danger delete-btn">
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
