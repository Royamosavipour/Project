import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";

import "./IndexAdmin.css";
import PAdminItem from "../../../Components/PAdminItem/PAdminItem";

export default function Index() {
  const [infos, setInfos] = useState([]);
  const [lastRegesterUser, setLastRegesterUser] = useState([]);
  const [adminPage, setAdminPage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:4000/v1/infos/p-admin`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((pageInfo) => {
        console.log(pageInfo);
        setInfos(pageInfo.infos);
        setLastRegesterUser(pageInfo.lastUsers);
        setAdminPage(pageInfo.adminName);
      });
  }, []);

  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-content-title">
            <span class="welcome">
              خوش آمدید,<span class="name">{adminPage}</span>
            </span>
          </div>
          <div class="home-content-boxes">
            <div class="row">
              {infos.map((item, index) => (
                <PAdminItem {...item} />
              ))}
            </div>
          </div>

          <div class="home-content-latset-users">
            <DataTable title="افراد اخیرا ثبت نام شده">
              <table class="table">
                <thead>
                  <tr>
                    <th>شناسه</th>
                    <th>نام و نام خانوادگی</th>
                    <th>ایمیل</th>
                  </tr>
                </thead>
                <tbody>
                  {lastRegesterUser.map((users, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{users.username}</td>
                      <td>{users.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </DataTable>
          </div>
        </div>
      </div>
    </>
  );
}
