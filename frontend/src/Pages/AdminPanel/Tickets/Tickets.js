import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";

export default function Tickets() {
  const [tickets, settickets] = useState([]);

  useEffect(() => {
    getAllTickets();
  }, []);

  function getAllTickets() {
    fetch(`http://localhost:4000/v1/tickets`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        settickets(data);
      });
  }

  const shwoTicket = (body) => {
    swal({
      title: body,
      buttons: "اوکی",
    });
  };

  const acceptToTicket = (ticketID) => {
    swal({
      title: "لطفا متن مورد نظر را وارد کنید",
      content: "input",
      buttons: "اوکی",
    }).then((value) => {
      if (value) {
        const answerTicket = {
          ticketID,
          body: value,
        };
        fetch(`http://localhost:4000/v1/tickets/answer`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Berer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
          body: JSON.stringify(answerTicket),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            getAllTickets();
          });
      }
    });
  };

  return (
    <>
      <DataTable title={"تیکتها"}>
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th> کاربر </th>
              <th> عنوان </th>
              <th> نوع </th>
              <th> دوره </th>
              <th> الویت </th>
              <th> مشاهده </th>
              <th>پاسخ</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, Index) => (
              <tr key={Index}>
                <td>{Index + 1} </td>
                <td>{ticket.user} </td>
                <td>{ticket.title} </td>
                <td>{ticket.departmentSubID} </td>
                <td>{ticket.course ? ticket.course : "--"} </td>
                <td>
                  {ticket.priority === 1 && "بالا"}
                  {ticket.priority === 2 && "متوسط"}
                  {ticket.priority === 3 && "کم"}
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary edit-btn"
                    onClick={() => shwoTicket(ticket.body)}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class=" {ticket.answer===1?'answer':'noanswer'}"
                    onClick={() => acceptToTicket(ticket._id)}
                    className={`btn btn-primary edit-btn ${
                      ticket.answer === 1 ? "answer" : "noanswer"
                    }`}
                  >
                    {ticket.answer === 1 ? "جواب داده شد" : "عدم  جواب"}
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
