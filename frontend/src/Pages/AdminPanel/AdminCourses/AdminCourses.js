// import React, { useEffect, useState } from "react";
// import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
// import swal from "sweetalert";
// import { useForm } from "./../../../Hooks/useForm";
// import Input from "./../../../Components/Form/Input";
// import {
//   requiredValidator,
//   minValidator,
//   maxValidator,
// } from "../../../Validaitors/rules";

// import "./Courses.css";

// export default function Courses() {
//   const [courses, setCourses] = useState([]);
//   const [courseCategory, setCourseCategory] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [courseStatus, setCourseStatus] = useState('start')
//   const [courseCover, setCourseCover] = useState({})

//   const [formState, onInputHandler] = useForm(
//     {
//       name: {
//         value: "",
//         isValid: false,
//       },
//       description: {
//         value: "",
//         isValid: false,
//       },
//       shortName: {
//         value: "",
//         isValid: false,
//       },
//       price: {
//         value: "",
//         isValid: false,
//       },
//       support: {
//         value: "",
//         isValid: false,
//       },
//     },
//     false
//   );

//   useEffect(() => {
//     getAllCourses();

//     fetch(`http://localhost:4000/v1/category`)
//       .then((res) => res.json())
//       .then((allCategories) => {
//         setCategories(allCategories);
//       });
//   }, []);

//   function getAllCourses() {
//     const localStorageData = JSON.parse(localStorage.getItem("user"));
//     fetch("http://localhost:4000/v1/courses", {
//       headers: {
//         Authorization: `Bearer ${localStorageData.token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((allCourses) => {
//         console.log(allCourses);
//         setCourses(allCourses);
//       });
//   }

//   const removeCourse = (courseID) => {
//     const localStorageData = JSON.parse(localStorage.getItem("user"));
//     swal({
//       title: "آیا از حذف دوره اطمینان داری؟",
//       icon: "warning",
//       buttons: ["نه", "آره"],
//     }).then((result) => {
//       if (result) {
//         fetch(`http://localhost:4000/v1/courses/${courseID}`, {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${localStorageData.token}`,
//           },
//         }).then((res) => {
//           if (res.ok) {
//             swal({
//               title: "دوره موردنظر با موفقیت حذف شد",
//               icon: "success",
//               buttons: "اوکی",
//             }).then(() => {
//               getAllCourses();
//             });
//           } else {
//             swal({
//               title: "حذف دوره با مشکلی مواجه شد",
//               icon: "error",
//               buttons: "اوکی",
//             });
//           }
//         });
//       }
//     });
//   };

//   const selectCategory = (event) => {
//     setCourseCategory(event.target.value);
//   };

//   const addNewCourse = event => {
//     event.preventDefault()
//     console.log(formState);
//   }

//   return (
//     <>
//       <div class="container-fluid" id="home-content">
//         <div class="container">
//           <div class="home-title">
//             <span>افزودن دوره جدید</span>
//           </div>
//           <form class="form">
//             <div class="col-6">
//               <div class="name input">
//                 <label class="input-title">نام دوره</label>
//                 <Input
//                   id="name"
//                   element="input"
//                   onInputHandler={onInputHandler}
//                   validations={[minValidator(5)]}
//                   type="text"
//                   placeholder="لطفا نام دوره را وارد کنید..."
//                 />
//                 <span class="error-message text-danger"></span>
//               </div>
//             </div>
//             <div class="col-6">
//               <div class="price input">
//                 <label class="input-title">توضیحات دوره</label>
//                 <Input
//                   id="description"
//                   element="input"
//                   onInputHandler={onInputHandler}
//                   validations={[minValidator(5)]}
//                   type="text"
//                   placeholder="لطفا توضیحات دوره را وارد کنید..."
//                 />
//                 <span class="error-message text-danger"></span>
//               </div>
//             </div>
//             <div class="col-6">
//               <div class="number input">
//                 <label class="input-title">Url دوره</label>
//                 <Input
//                   id="shortName"
//                   element="input"
//                   onInputHandler={onInputHandler}
//                   validations={[minValidator(5)]}
//                   type="text"
//                   isValid="false"
//                   placeholder="لطفا Url دوره را وارد کنید..."
//                 />
//                 <span class="error-message text-danger"></span>
//               </div>
//             </div>
//             <div class="col-6">
//               <div class="price input">
//                 <label class="input-title">قیمت دوره</label>
//                 <Input
//                   id="price"
//                   element="input"
//                   onInputHandler={onInputHandler}
//                   validations={[minValidator(5)]}
//                   type="text"
//                   isValid="false"
//                   placeholder="لطفا قیمت دوره را وارد کنید..."
//                 />
//                 <span class="error-message text-danger"></span>
//               </div>
//             </div>
//             <div class="col-6">
//               <div class="price input">
//                 <label class="input-title">نحوه پشتیبانی دوره</label>
//                 <Input
//                   id="support"
//                   element="input"
//                   onInputHandler={onInputHandler}
//                   validations={[minValidator(5)]}
//                   type="text"
//                   isValid="false"
//                   placeholder="لطفا نحوه پشتیبانی دوره را وارد کنید..."
//                 />
//                 <span class="error-message text-danger"></span>
//               </div>
//             </div>
//             <div class="col-6">
//               <div class="number input">
//                 <label class="input-title">دسته‌بندی دوره</label>
//                 <select onChange={selectCategory}>
//                   {categories.map((category) => (
//                     <option value={category._id}>{category.title}</option>
//                   ))}
//                 </select>
//                 <span class="error-message text-danger"></span>
//               </div>
//             </div>
//             <div class="col-6">
//               <div class="file">
//                 <label class="input-title">عکس دوره</label>
//                 <input type="file" id="file" onChange={event => {
//                   console.log(event.target.files[0]);
//                   setCourseCover(event.target.files[0])
//                 }} />
//               </div>
//             </div>
//             <div class="col-12">
//               <div class="bottom-form">
//                 <div class="condition">
//                   <label class="input-title">وضعیت دوره</label>
//                   <div class="radios">
//                     <div class="available">
//                       <label>
//                         <span>در حال برگزاری</span>
//                         <input
//                           type="radio"
//                           value="start"
//                           name="condition"
//                           checked
//                           onInput={event => setCourseStatus(event.target.value)}
//                         />
//                       </label>
//                     </div>
//                     <div class="unavailable">
//                       <label>
//                         <span>پیش فروش</span>
//                         <input
//                           type="radio"
//                           value="presell"
//                           name="condition"
//                           onInput={event => setCourseStatus(event.target.value)}
//                         />
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//                 <div class="submit-btn">
//                   <input type="submit" value="افزودن" onClick={addNewCourse} />
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//       <DataTable title="دوره‌ها">
//         <table class="table">
//           <thead>
//             <tr>
//               <th>شناسه</th>
//               <th>عنوان</th>
//               <th>مبلغ</th>
//               <th>وضعیت</th>
//               <th>لینک</th>
//               <th>مدرس</th>
//               <th>دسته بندی</th>
//               <th>ویرایش</th>
//               <th>حذف</th>
//             </tr>
//           </thead>
//           <tbody>
//             {courses.map((course, index) => (
//               <tr>
//                 <td>{index + 1}</td>
//                 <td>{course.name}</td>
//                 <td>
//                   {course.price === 0
//                     ? "رایگان"
//                     : course.price.toLocaleString()}
//                 </td>
//                 <td>
//                   {course.isComplete === 0 ? "در حال برگزاری" : "تکمیل شده"}
//                 </td>
//                 <td>{course.shortName}</td>
//                 <td>{course.creator}</td>
//                 <td>{course.categoryID}</td>
//                 <td>
//                   <button type="button" class="btn btn-primary edit-btn">
//                     ویرایش
//                   </button>
//                 </td>
//                 <td>
//                   <button
//                     type="button"
//                     class="btn btn-danger delete-btn"
//                     onClick={() => removeCourse(course._id)}
//                   >
//                     حذف
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </DataTable>
//     </>
//   );
// }




import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";
import { useForm } from "../../../Hooks/useForm";
import Input from './../../../Components/Form/Input';
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
                  placeholder="لطفا تعداد دوره را وارد کنید..."
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
                  placeholder="لطفا قیمت دوره را وارد کنید..."
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
