import React, { useContext, useEffect, useState } from "react";
import {} from "../../../Validaitors/rules";
import authContext from "./../../../Context/authContext";
import swal from "sweetalert";

import "./EditAccunt.css";

export default function EditAccunt() {
  const AuthContext = useContext(authContext);
  const [name, setName] = useState("");
  const [phone, setphone] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  useEffect(() => {
    setName(AuthContext.userInfos.name);
    setphone(AuthContext.userInfos.phone);
    setusername(AuthContext.userInfos.username);
    setemail(AuthContext.userInfos.email);
    setpassword(AuthContext.userInfos.password);
  }, []);

  function editAccount(event) {
    event.preventDefault();
    const newInformation = {
      name,
      username,
      email,
      password,
      phone,
    };
    fetch(`http://localhost:4000/v1/users/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
      body: JSON.stringify(newInformation),
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "اطلاعات با موفقیت ویرایش شد",
          icon: "success",
          buttons: "خیلی عالی",
        });
      } else {
        res.text();
      }
    });
  }

  return (
    <>
      <div class="col-9">
        <div class="edit">
          <form class="edit__form" action="#">
            <div class="edit__personal">
              <div class="row">
                <div class="col-12">
                  <label class="edit__label">شماره موبایل *</label>
                  <input
                    class="edit__input"
                    type="text"
                    value={phone}
                    onChange={(event) => setphone(event.target.value)}
                    placeholder="لطفا شماره موبایل خود را وارد کنید"
                  />
                </div>

                <div class="col-12">
                  <label class="edit__label">نام و نام خانوادگی *</label>
                  <input
                    class="edit__input"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="لطفا نام نمایشی خود را وارد کنید"
                  />
                </div>
                <div class="col-12">
                  <label class="edit__label">نام کاربری (نمایشی) *</label>
                  <input
                    class="edit__input"
                    type="text"
                    value={username}
                    onChange={(event) => setusername(event.target.value)}
                    placeholder="لطفا نام نمایشی خود را وارد کنید"
                  />
                  <span class="edit__help">
                    اسم شما به این صورت در حساب کاربری و نظرات دیده خواهد شد.
                  </span>
                </div>
                <div class="col-12">
                  <label class="edit__label">آدرس ایمیل *</label>
                  <input
                    class="edit__input"
                    type="text"
                    value={email}
                    onChange={(event) => setemail(event.target.value)}
                    placeholder="لطفا نام نمایشی خود را وارد کنید"
                  />
                </div>
              </div>
            </div>
            <div class="edit__password">
              <span class="edit__password-title">تغییر گذرواژه</span>
              <div class="row">
                <div class="col-12">
                  <label class="edit__label">تکرار گذرواژه جدید</label>
                  <input
                    class="edit__input"
                    type="text"
                    value={password}
                    onChange={(event) => setpassword(event.target.value)}
                    placeholder="تکرار گذرواژه جدید"
                  />
                </div>
              </div>
            </div>
            <button class="edit__btn" type="submit" onClick={editAccount}>
              ذخیره تغییرات
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
