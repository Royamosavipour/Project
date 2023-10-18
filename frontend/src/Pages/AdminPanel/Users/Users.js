import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const localStoragData = JSON.parse(localStorage.getItem("user"));
    fetch(`http://localhost:4000/v1/users`, {
      headers: { Authorization: `Bearer ${localStoragData.token}` },
    })
      .then((res) => res.json())
      .then((allUsers) => {
        console.log(allUsers);
        setUsers(allUsers)
      });
  }, []);
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
              <tr>
                <td>{index + 1} </td>
                <td>{user.name} </td>
                <td>{user.email} </td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-danger delete-btn">
                    حذف
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-danger delete-btn">
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
