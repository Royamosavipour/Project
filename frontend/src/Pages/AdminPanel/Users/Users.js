import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";

import "./Users.css";

export default function Users() {
  const [users, setUsers] = useState([]);
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
        console.log(allUsers);
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
const localStorageData=JSON.parse(localStorage.getItem('user'))
swal({
  title:'آیا از بن مطمینید?',
  icon:'warning',
  buttons:['No','Yes'],
}).then(res=>{
  console.log(res)
  if (res) {
    fetch(`http://localhost:4000/v1/users/ban/${userID}`,{
      method:'PUT',
      headers:{'Authorization':`Bearer ${localStorageData.token}`}
    }).then(res=>{
      console.log(res)
      if (res.ok) {
        swal({
          title:'شماره تماس مسدود می باشد',
          icon:'success',
          buttons:'اوکی'
          
        })
        
      }
    })

    
  }
})





  };

  return (
    <>
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
