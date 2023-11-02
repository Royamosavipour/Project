import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";

import "./Courses.css";

export default function AdminCourses() {
  const [allCourses, setAllCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [coursCategory, setCoursCategory] = useState("");

  useEffect(() => {
    getAllcourses();

    fetch(`http://localhost:4000/v1/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        setCategories(allCategories);
      });
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
        fetch(`http://localhost:4000/v1/courses/${coursID}`, {
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

  const selectCategory = (e) => {
    setCoursCategory(e.target.value);
  };

  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن محصول جدید</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
                <label class="input-title">نام محصول</label>
                <input
                  type="text"
                  isValid="false"
                  placeholder="لطفا نام محصول را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">قیمت محصول</label>
                <input
                  type="text"
                  isValid="false"
                  placeholder="لطفا قیمت محصول را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="number input">
                <label class="input-title">تعداد محصول</label>
                <input
                  type="text"
                  isValid="false"
                  placeholder="لطفا تعداد محصول را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">قیمت محصول</label>
                <input
                  type="text"
                  isValid="false"
                  placeholder="لطفا قیمت محصول را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="number input">
                <label class="input-title">دسته‌بندی دوره</label>
                <select onChange={selectCategory}>
                  {categories.map((category) => (
                    <option value={category._id}>{category.title}</option>
                  ))}
                </select>
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="file">
                <label class="input-title">عکس محصول</label>
                <input type="file" id="file" />
              </div>
            </div>
            <div class="col-12">
              <div class="bottom-form">
                <div class="condition">
                  <label class="input-title">موجودی</label>
                  <div class="radios">
                    <div class="available">
                      <label>
                        <span>موجود</span>
                        <input
                          type="radio"
                          value="avalibe"
                          name="condition"
                          checked
                        />
                      </label>
                    </div>
                    <div class="unavailable">
                      <label>
                        <span>ناموجود</span>
                        <input
                          type="radio"
                          value="unavailable"
                          name="condition"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div class="submit-btn">
                  <input type="submit" value="افزودن" />
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="presell">
                <label class="input-title">وضعیت دوره</label>
                <div class="radios">
                  <div class="presell-true">
                    <label>
                      <span>پیش فروش</span>
                      <input
                        type="radio"
                        value="presell"
                        name="presell"
                        checked
                      />
                    </label>
                  </div>
                  <div class="presell-false">
                    <label>
                      <span>در حال برگزاری</span>
                      <input type="radio" value="onperforming" name="presell" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

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
