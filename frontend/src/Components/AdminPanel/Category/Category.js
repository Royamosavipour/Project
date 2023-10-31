import React, { useEffect, useState } from "react";
import DataTable from "../DataTable/DataTable";
import Input from "../../../Components/Form/Input";
import { useForm } from "../../../Hooks/useForm";
import swal from "sweetalert";

import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
} from "../../../Validaitors/rules";

import "./Category.css";

export default function Category() {
  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      shortname: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getallCategories();
  }, []);

  function getallCategories() {
    fetch(`http://localhost:4000/v1/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        setCategories(allCategories);
      });
  }

  const createNewCategory = (event) => {
    event.preventDefault();
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    const newCategoryInfo = {
      title: formState.inputs.title.value,
      name: formState.inputs.shortname.value,
    };

    fetch("http://localhost:4000/v1/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageData.token}`,
      },
      body: JSON.stringify(newCategoryInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        swal({
          title: "دسته بندی مورد نظر با موفقیت اضافه شد",
          icon: "success",
          buttons: "اوکی",
        }).then(() => {
          getallCategories();
        });
      });
  };

  function removeCategory(categoryID) {
    const localHostData = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "آیا از حذف مطمینی",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/category/${categoryID}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localHostData.token}` },
        })
          .then((res) => res.json())
          .then((result) => {
            swal({
              title: "حذف انجام گردید",
              icon: "success",
              buttons: "OK",
            }).then((res) => {
              getallCategories();
            });
          });
      }
    });
  }

  const updateCategory = (categoryID) => {
    const logalStorageData = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "دسته بندی جدید را وارد کنید",
      content: "input",
      buttons: "ثبت عنوان جدید",
    }).then((result) => {
      if (result.trim().length) {
        fetch(`http://localhost:4000/v1/category/${categoryID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${logalStorageData.token}`,
          },
          body: JSON.stringify({
            title: result,
            name: result,
          }),
        })
          .then((res) => {
            res.json();
          })

          .then((result) => {
            swal({
              title: "دسته بندی مورد نظر ثبت گردید",
              buttons: "ok",
              icon: "success",
            }).then(() => getallCategories());
          });
      }
    });
  };

  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن دسته‌بندی جدید</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
                <label class="input-title">عنوان</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="title"
                  placeholder="لطفا عنوان را وارد کنید..."
                  validations={[minValidator(5), maxValidator(20)]}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="name input">
                <label class="input-title">اسم کوتاه</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="shortname"
                  placeholder="لطفا اسم کوتاه را وارد کنید..."
                  validations={[minValidator(5), maxValidator(20)]}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-12">
              <div class="bottom-form">
                <div class="submit-btn">
                  <input
                    type="submit"
                    value="افزودن"
                    onClick={createNewCategory}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <DataTable title={"دسته بندی"}>
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr>
                <td>{index + 1} </td>
                <td>{category.title} </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary edit-btn"
                    onClick={() => updateCategory(category._id)}
                  >
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    onClick={() => removeCategory(category._id)}
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
