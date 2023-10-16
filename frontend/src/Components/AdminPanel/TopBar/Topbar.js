import React, { useEffect, useState } from "react";

export default function Topbar() {
  const [adminInfo, setAdminInfo] = useState({});
  const [adminNotification, setAdminNotification] = useState([]);
  const [isShowNotificationBox, setIsShowNotificationBox] = useState(false);

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    fetch(`http://localhost:4000/v1/auth/me`, {
      headers: { Authorization: `Bearer ${localStorageData.token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAdminInfo(data);
        setAdminNotification(data.notifications);
      });
  }, []);
  return (
    <div class="container-fluid">
      <div class="container">
        <div
          class={`home-header ${
            isShowNotificationBox &&
            adminNotification.length &&
            "active-modal-notfication"
          }`}
        >
          <div class="home-right">
            <div class="home-searchbar">
              <input type="text" class="search-bar" placeholder="جستجو..." />
            </div>
            <div class="home-notification">
              <button
                type="button"
                onMouseEnter={() => setIsShowNotificationBox(true)}
              >
                <i class="far fa-bell"></i>
              </button>
            </div>
            <div
              class="home-notification-modal"
              onMouseEnter={() => setIsShowNotificationBox(true)}
              onMouseLeave={() => setIsShowNotificationBox(false)}
            >
              <ul class="home-notification-modal-list">
                {adminNotification.map((notificat) => (
                  <li class="home-notification-modal-item">
                    <span class="home-notification-modal-text">
                      {notificat}{" "}
                    </span>
                    <label class="switch">
                      <a href="javascript:void(0)">دیدم</a>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div class="home-left">
            <div class="home-profile">
              <div class="home-profile-image">
                <a href="#">
                  <img src={adminInfo.profile} alt="" />
                </a>
              </div>
              <div class="home-profile-name">
                <a href="#">{adminInfo.name}</a>
              </div>
              <div class="home-profile-icon">
                <i class="fas fa-angle-down"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
