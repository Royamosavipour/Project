import { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";

export default function Contact() {
  const [allContacts, setAllContacts] = useState([]);

  useEffect(() => {
    getallCantacts();
  }, []);

  function getallCantacts() {
    fetch(`http://localhost:4000/v1/contact`)
      .then((res) => res.json())
      .then((allCantact) => {
        console.log(allCantact);
        setAllContacts(allCantact);
      });
  }

  const showMessage = (body) => {
    swal({
      title: body,
      buttons: "اوکی",
    });
  };

  const sendAnswerToUser = (getEmail) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "متن ایمیل را وارد نمایید",
      buttons: "ارسال ایمیل",
      content: "input",
    }).then((valu) => {
      const answerInfo = {
        email: getEmail,
        answer: valu,
      };
      fetch(`http://localhost:4000/v1/contact/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorageData.token}`,
        },
        body: JSON.stringify(answerInfo),
      }).then((res) => {
        if (res.ok) {
          getallCantacts()
          return res.json();
        }
      });
    });
  };

  const removeContact = (contactId) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "آیا از حذف مطمینی",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((result) => {
      console.log(result);
      if (result) {
        fetch(`http://localhost:4000/v1/contact/${contactId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorageData.token}` },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "پیام مورد نظر حذف گردید",
              icon: "success",
              buttons: "ok",
            }).then(() => {
              getallCantacts();
            });
          }
        });
      }
    });
  };
  return (
    <>
      <DataTable title={"پیامها"}>
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام خانوادگی نام</th>
              <th>ایمیل</th>
              <th>شماره تماس</th>
              <th>مشاهده متن</th>
              <th>پاسخ دادن</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {allContacts.map((contact, index) => (
              <tr>
                <td className={contact.answer===1?'answer-contact':'no-answer-contact'}>{index + 1} </td>
                <td>{contact.name} </td>
                <td>{contact.email} </td>
                <td>{contact.phone} </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary edit-btn"
                    onClick={() => showMessage(contact.body)}
                  >
                    مشاهده پیام
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    onClick={() => sendAnswerToUser(contact.email)}
                  >
                    پاسخ دادن
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    onClick={() => removeContact(contact._id)}
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
