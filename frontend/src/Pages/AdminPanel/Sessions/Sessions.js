import React, { useEffect, useState } from "react";
import Input from "../../../Components/Form/Input";
import { useForm } from "../../../Hooks/useForm";
import { minValidator } from "../../../Validaitors/rules";
import swal from "sweetalert";
import DataTable from './../../../Components/AdminPanel/DataTable/DataTable'

export default function Sessions() {
  const [courses, setCourses] = useState([]);
  const [sessionCourse, setSessionCourse] = useState("-1");
  const [sessionVideo, setSessionVideo] = useState({});
  const [sessionFree, setSessionFree] = useState("0");
  const [setions, setSetions] = useState([]);

  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      time: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllSesstion();

    fetch(`http://localhost:4000/v1/courses`)
      .then((res) => res.json())
      .then((allcourses) => {
        console.log(allcourses);
        setCourses(allcourses);
      });
  }, []);

  const createSession = (e) => {
    e.preventDefault();
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    let formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    formData.append("time", formState.inputs.time.value);
    formData.append("video", sessionVideo);
    formData.append("free", sessionFree);

    fetch(`http://localhost:4000/v1/courses/${sessionCourse}/sessions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorageData.token}` },
      body: formData,
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "درخواست دوره ثیت گردید",
          icon: "success",
          buttons: "OK",
        }).then(() => console.log("get all sesstion"));
      }
    });
  };

  function getAllSesstion() {
    fetch(`http://localhost:4000/v1/courses/sessions`)
      .then((res) => res.json())
      .then((allsetions) => {
        console.log(allsetions);
        setSetions(allsetions);
      });
  }

  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن جلسه جدید</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
                <label class="input-title">عنوان جلسه</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="title"
                  validations={[minValidator(5)]}
                  placeholder="لطفا نام جلسه را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="name input">
                <label class="input-title">فایل جلسه</label>
                <input
                  type="file"
                  onChange={(e) => setSessionCourse(e.target.value)}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">مدت زمان جلسه</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="time"
                  validations={[minValidator(5)]}
                  placeholder="لطفا مدت زمان جلسه را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title" style={{ display: "block" }}>
                  دوره
                </label>
                <select
                  class="select"
                  onChange={(event) => setSessionCourse(event.target.value)}
                >
                  <option value="-1">دوره مدنظر را انتخاب کنید</option>
                  {courses.map((course) => (
                    <option value={course._id} key={course._id}>
                      {course.name}
                    </option>
                  ))}
                </select>
                <span class="error-message text-danger"></span>
              </div>
            </div>

            <div class="col-12">
              <div class="bottom-form">
                <div class="submit-btn">
                  <input type="submit" value="افزودن" onClick={createSession} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
