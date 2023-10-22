import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";
import Input from "../../../Components/Form/Input";
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
} from "../../../Validaitors/rules";
import { useForm } from "../../../Hooks/useForm";

import "./Users.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [formState, onInputHandler] = useForm(
    {
      name: { value: "", isValid: false },
      username: { value: "", isValid: false },
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
      phone: { value: "", isValid: false },
    },
    false
  );

  useEffect(() => {
    getAllUsers();
  }, []);

  function getAllUsers() {
    const localStoragData = JSON.parse(localStorage.getItem("user"));
    fetch(`http://localhost:4000/v1/users`, {
      headers: { Authorization: `Bearer ${localStoragData.token}` },
    })
      .then((res) => res.json())
      .then((allUsers) => {
        setUsers(allUsers);
      });
  }

  const removeUser = (userID) => {
    const localStoragData = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "آیا از حذف مطمین هستید?",
      buttons: ["نه", "بله"],
      icon: "warning",
    }).then((res) => {
      console.log(res);
      if (res) {
        fetch(`http://localhost:4000/v1/users/${userID}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStoragData.token}` },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "حذف با موفقیت انجام گردید",
              buttons: "ok",
              icon: "success",
            }).then(() => {
              getAllUsers();
            });
          } else {
            swal({
              title: "خطا",
              icon: "getAllUsers",
            });
          }
        });
      }
    });
  };

  const banHandeler = (userID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "آیا از بن مطمینید?",
      icon: "warning",
      buttons: ["No", "Yes"],
    }).then((res) => {
      console.log(res);
      if (res) {
        fetch(`http://localhost:4000/v1/users/ban/${userID}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${localStorageData.token}` },
        }).then((res) => {
          console.log(res);
          if (res.ok) {
            swal({
              title: "شماره تماس مسدود می باشد",
              icon: "success",
              buttons: "اوکی",
            });
          }
        });
      }
    });
  };

  const registerNewUser = (event) => {
    event.preventDefault();
    const newUserInfo = {
      name: formState.inputs.name.value,
      username: formState.inputs.username.value,
      email: formState.inputs.email.value,
      phone: formState.inputs.phone.value,
      password: formState.inputs.password.value,
      confirmPassword: formState.inputs.password.value,
    };

    fetch(`http://localhost:4000/v1/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUserInfo),
    })
      .then((res) => {
        res.json();
        console.log(res);
        if (res.ok) {
          swal({
            title: "ثبت با موفقیت انحام گردید",
            icon: "success",
            buttons: "ok",
          });
        } else if (res.statusText === "Conflict") {
          swal({
            title: "اطلاعات قبلا ثبت گردیده است",
            icon: "warning",
            buttons: "ok",
          });
        }
      })
      .then((data) => {
        console.log(data);
        getAllUsers();
      });
  };

  return (
    <>
      {/* *********************************regester new user */}
      <div class="home-content-edit">
        <div class="back-btn">
          <i class="fas fa-arrow-right"></i>
        </div>
        <form class="form">
          <div class="col-6">
            <div class="name input">
              <label class="input-title">نام و نام خانوادگی</label>
              <Input
                type="text"
                className=""
                id="name"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا نام و نام خانوادگی کاربر را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="family input">
              <label class="input-title">نام کاربری</label>
              <Input
                type="text"
                className=""
                id="username"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا نام کاربری را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="email input">
              <label class="input-title">ایمیل</label>
              <Input
                type="text"
                className=""
                id="email"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                  emailValidator(),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا ایمیل کاربر را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="password input">
              <label class="input-title">رمز عبور</label>
              <Input
                type="text"
                className=""
                id="password"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا رمز عبور کاربر را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="phone input">
              <label class="input-title">شماره تلفن</label>
              <Input
                type="text"
                className=""
                id="phone"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا شماره تلفن کاربر را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-12">
            <div class="bottom-form">
              <div class="submit-btn">
                <input type="submit" value="افزودن" onClick={registerNewUser} />
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* ******************************************** Users */}
      <DataTable title={"کاربران"}>
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام خانوادگی نام</th>
              <th>ایمیل</th>
              <th>ویرایش</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr className="show">
                <td>{index + 1} </td>
                <td>{user.name} </td>
                <td>{user.email} </td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    onClick={() => removeUser(user._id)}
                  >
                    حذف
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    onClick={() => banHandeler(user._id)}
                  >
                    بن
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
