import React, { useEffect, useState } from "react";
import Input from "../../Components/Form/Input";
import { useForm } from "../../Hooks/useForm";
import { minValidator, requiredValidator } from "../../Validaitors/rules";
import swal from "sweetalert";
import DataTable from "../../Components/AdminPanel/DataTable/DataTable";

export default function Offs() {
  const [courses, setCourses] = useState([]);
  const [offCourse, setOffCourse] = useState("");
  const [offs, setOffs] = useState([]);

  const [formState, onInputHandler] = useForm(
    {
      code: { value: "", isValid: false },
      percent: { value: "", isValid: false },
      max: { value: "", isValid: false },
    },
    false
  );

  useEffect(() => {
    getallOffs();
    fetch(`http://localhost:4000/v1/courses`)
      .then((res) => res.json())
      .then((allCourses) => setCourses(allCourses));
  }, []);

  // create discont for button add
  const creatOffes = (event) => {
    event.preventDefault();
    const newOffs = {
      code: formState.inputs.code.value,
      percent: formState.inputs.percent.value,
      course: offCourse,
      max: formState.inputs.max.value,
    };
    fetch(`http://localhost:4000/v1/offs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
      body: JSON.stringify(newOffs),
    }).then((res) => {
      console.log(res);
      if (res.ok) {
        swal({
          title: "کد تخفیف با موفقیت ثبت گردید",
          icon: "success",
          buttons: "OK",
        }).then(() => {
          getallOffs();
        });
      }
      return res.text();
    });
  };

  function getallOffs() {
    fetch(`http://localhost:4000/v1/offs`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((allOffs) => {
        setOffs(allOffs);
        console.log(allOffs);
      });
  }

  const removeOff = (offID) => {
    swal({
      title: "آیا از حذف اطمینان دارید",
      icon: "warning",
      buttons: ["NO", "Yes"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/offs/${offID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "حذف با موفقیت انجام شد",
              icon: "success",
              buttons: "OK",
            }).then(() => getallOffs());
          }
        });
      }
    });
  };

  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن تخفیف جدید</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
                <label class="input-title">کد تخفیف </label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="code"
                  validations={[requiredValidator()]}
                  placeholder="لطفا کد تخفیف را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title"> درصد تخفیف </label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="percent"
                  validations={[requiredValidator()]}
                  placeholder="لطفا   درصد تخفیف را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title"> حداکثر تخفیف </label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="max"
                  validations={[requiredValidator()]}
                  placeholder="لطفا   درصد تخفیف را وارد کنید..."
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
                  onChange={(event) => setOffCourse(event.target.value)}
                >
                  <option value="-1">دوره مدنظر را انتخاب کنید</option>
                  {courses.map((cours) => (
                    <option key={cours._id} value={cours._id}>
                      {cours.name}
                    </option>
                  ))}
                </select>
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-12">
              <div class="bottom-form">
                <div class="submit-btn">
                  <input type="submit" value="افزودن" onClick={creatOffes} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title="کدهای تخفیف">
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th> کد </th>
              <th>درصد</th>
              <th>حداکثر استفاده</th>
              <th>دفعات استفاده</th>
              <th>ایجاد کننده کد</th>

              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {offs.map((off, index) => (
              <tr key={off._id}>
                <td>{index + 1} </td>
                <td>{off.code} </td>
                <td>{off.percent} </td>
                <td>{off.max} </td>
                <td>{off.uses} </td>
                <td>{off.creator} </td>

                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    onClick={() => removeOff(off._id)}
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
