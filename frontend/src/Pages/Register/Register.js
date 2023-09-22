import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import TopBar from "../../Components/TopBar/TopBar";
import Footer from "../../Components/Footer/Footer";
import Input from "../../Components/Form/Input";
import Button from "../../Components/Form/Button";
import { useForm } from "../../Hooks/useForm";
import {
  requierdValidaitor,
  minValidaitor,
  maxValidaitor,
  emailValidaitor,
} from "../../Validaitors/rules";

import "./Register.css";

export default function Register() {
  const [formState, onInputHandeler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      username: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const regesterNewUser = (event) => {
    event.preventDefault();
    console.log("user regester");
  };
  return (
    <>
      <TopBar />
      <Navbar />

      <section className="login-register">
        <div className="login register-form">
          <span className="login__title">ساخت حساب کاربری</span>
          <span className="login__subtitle">
            خوشحالیم قراره به جمع ما بپیوندی
          </span>
          <div className="login__new-member">
            <span className="login__new-member-text">
              قبلا ثبت‌نام کرده‌اید؟{" "}
            </span>
            <Link className="login__new-member-link" to="/login">
              وارد شوید
            </Link>
          </div>
          <form action="#" className="login-form">
            <div className="login-form__username">
              <Input
                element="input"
                className="login-form__username-input"
                type="text"
                placeholder="نام و نام خانوادگی"
                id="name"
                onInputHandeler={onInputHandeler}
                validations={[
                  requierdValidaitor(),
                  minValidaitor(6),
                  maxValidaitor(20),
                  
                ]}
              />

              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__username">
              <Input
                element="input"
                className="login-form__username-input"
                type="text"
                placeholder="نام کاربری"
                id="username"
                onInputHandeler={onInputHandeler}
                validations={[
                  requierdValidaitor(),
                  minValidaitor(6),
                  maxValidaitor(20),
                  
                ]}
              />

              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__password">
              <Input
                className="login-form__password-input"
                type="text"
                placeholder="آدرس ایمیل"
                element="input"
                id="email"
                onInputHandeler={onInputHandeler}
                validations={[
                  requierdValidaitor(),
                  maxValidaitor(20),
                  emailValidaitor()
                  
                ]}
              />
              <i className="login-form__password-icon fa fa-envelope"></i>
            </div>
            <div className="login-form__password">
              <Input
                element="input"
                className="login-form__password-input"
                type="password"
                placeholder="رمز عبور"
                id="password"
                onInputHandeler={onInputHandeler}
                validations={[
                  requierdValidaitor(),
                  minValidaitor(6),
                  maxValidaitor(20),
                  
                ]}
              />
              <i className="login-form__password-icon fa fa-lock-open"></i>
            </div>
            <Button
              className={`login-form__btn ${
                formState.isFormValid
                  ? "login-form__btn_success"
                  : "login-form__btn_error"
              }`}
              type="submit"
              onClick={regesterNewUser}
              disabled={false}
            >
              <i className="login-form__btn-icon fa fa-user-plus"></i>
              <span className="login-form__btn-text">عضویت</span>
            </Button>
          </form>
          <div className="login__des">
            <span className="login__des-title">سلام کاربر محترم:</span>
            <ul className="login__des-list">
              <li className="login__des-item">
                لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس
                استفاده کنید.
              </li>
              <li className="login__des-item">
                ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.
              </li>
              <li className="login__des-item">
                لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
