import React, { useState } from "react";
import swal from "sweetalert";

export default function Discounts() {
  const [discount, setDiscount] = useState("");

  function setDiscounts(event) {
    event.preventDefault();
    const requestBody = { discount };
    fetch(`http://localhost:4000/v1/offs/all`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
      body: JSON.stringify(requestBody),
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "تخفیف با موفقیت ثبت گردید",
          icon: "success",
          buttons: "اوکی",
        });
      } else {
        res.text();
      }
    });
  }
  return (
    <>
      <form className="form">
        <div className="col-6">
          <div className="name input">
            <label className="input-title">در صد تخفیف </label>
            <input
              onChange={(event) => setDiscount(event.target.value)}
              type="text"
              placeholder="لطفا تخفیف را وارد  کنید..."
              value={discount}
            />
            <span className="error-message text-danger"></span>
          </div>
        </div>

        <div className="col-12">
          <div className="bottom-form">
            <div className="submit-btn">
              <input type="submit" value="افزودن" onClick={setDiscounts} />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
