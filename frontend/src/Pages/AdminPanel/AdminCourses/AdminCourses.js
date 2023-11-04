import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";
import { useForm } from "../../../Hooks/useForm";
import Input from "./../../../Components/Form/Input";
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
} from "../../../Validaitors/rules";

import "./Courses.css";

export default function AdminCourses() {
  const [allCourses, setAllCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [coursCategory, setCoursCategory] = useState("");
  const [coursStatus, setCourseStatus] = useState("start");
  const [courseCover, setCourseCover] = useState({});

  const [formState, onInputHandler] = useForm(
    {
      name: { value: "", isValid: false },
      description: { value: "", isValid: false },
      shortName: { value: "", isValid: false },
      price: { value: "", isValid: false },
      support: { value: "", isValid: false },
    },
    false
  );

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

  const addNewCours = (e) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    e.preventDefault();
    let formData = new FormData();
    formData.append("name", formState.inputs.name.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("shortName", formState.inputs.shortName.value);
    formData.append("categoryID", coursCategory);
    formData.append("price", formState.inputs.price.value);
    formData.append("support", formState.inputs.support.value);
    formData.append("status", coursStatus);
    formData.append("cover", courseCover);

    fetch(`http://localhost:4000/v1/courses`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorageData.token}` },
      body: formData,
    }).then((res) => {
      if (res.ok) {
        swal({
          title: 'دوره ثبت گردید',
          icon: 'success',
          buttons:'اوکی'
        }).then(()=>getAllcourses())
      }
    })
  };

  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن دوره جدید</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
                <label class="input-title">نام دوره</label>

                <Input
                  id="name"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  isValid="false"
                  placeholder="لطفا نام دوره را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">توضیحات دوره</label>
                <Input
                  id="description"
                  element="input"
                  validations={[minValidator(5)]}
                  type="text"
                  isValid="false"
                  onInputHandler={onInputHandler}
                  placeholder="لطفا توضیحات دوره را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="number input">
                <label class="input-title">تعداد دوره</label>
                <Input
                  id="shortName"
                  element="input"
                  validations={[minValidator(5)]}
                  type="text"
                  isValid="false"
                  onInputHandler={onInputHandler}
                  placeholder= "لطفا Url دوره را وارد کنید"
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">قیمت دوره</label>
                <Input
                  id="price"
                  element="input"
                  validations={[minValidator(5)]}
                  type="text"
                  isValid="false"
                  onInputHandler={onInputHandler}
                  placeholder="لطفا قیمت دوره را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">ساپورت دوره</label>
                <Input
                  id="support"
                  element="input"
                  validations={[minValidator(5)]}
                  type="text"
                  isValid="false"
                  onInputHandler={onInputHandler}
                  placeholder="لطفا نحوه پشتیبانی دوره را وارد کنید"
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
                <label class="input-title">عکس دوره</label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => {
                    setCourseCover(e.target.files[0]);
                  }}
                />
              </div>
            </div>

            <div class="col-12">
              <div class="bottom-form">
                <div class="condition">
                  <label class="input-title">وضعیت دوره</label>
                  <div class="radios">
                    <div class="available">
                      <label>
                        <span>پیش فروش</span>
                        <input
                          type="radio"
                          value="presell"
                          name="condition"
                          onInput={(event) => setCourseStatus(event.target.value)}
                        />
                      </label>
                    </div>
                    <div class="unavailable">
                      <label>
                        <span>در حال برگزاری</span>
                        <input
                          type="radio"
                          value="start"
                          name="condition"
                          onInput={(event) => setCourseStatus(event.target.value)}
                          checked
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div class="submit-btn">
                  <input type="submit" value="افزودن" onClick={addNewCours} />
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
              <tr key={index}>
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
