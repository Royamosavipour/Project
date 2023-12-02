import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";

export default function Comments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getAllComments();
  }, []);

  function getAllComments() {
    fetch(`http://localhost:4000/v1/comments`)
      .then((res) => res.json())
      .then((allComments) => {
        console.log(allComments);
        setComments(allComments);
      });
  }

  // Delete Comment
  const removecoment = (commentID) => {
    swal({
      title: "آیا از حذف مطمینید؟",
      icon: "warning",
      buttons: ["No", "Yes"],
    }).then((result) => {
      console.log(result);
      if (result) {
        fetch(`http://localhost:4000/v1/comments/${commentID}`, {
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
              buttons: "اوکی",
              icon: "success",
            }).then(() => {
              getAllComments();
            });
          }
        });
      }
    });
  };

  // get show comment
  const showCommentBody = (commentBody) => {
    swal({
      title: commentBody,
      buttons: "اوکی",
    });
  };

  // Ban Id comment user
  const banComment = (comentID) => {
    swal({
      title: "آیا از بن کردن مطمینی",
      buttons: ["No", "Yes"],
      icon: "warning",
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/users/ban/${comentID}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "بن با موفقیت انحام شد",
              icon: "success",
              buttons: "اوکی",
            }).then(() => getAllComments());
          }
        });
      }
    });
  };

  // answer To comment
  const answerToComment = (commentID) => {
    swal({
      title: "پاسخ مورد نظر را وارد نمایید",
      content: "input",
      buttons: "ثبت پاسخ",
    }).then((answer) => {
      if (answer) {
        const commentAnswer = { body: answer };
        fetch(`http://localhost:4000/v1/comments/answer/${commentID}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
          body: JSON.stringify(commentAnswer),
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "ارسال با موفقیت انحام شد",
              buttons: "اوکی",
              icon: "success",
            }).then(() => getAllComments());
          }
        });
      }
    });
  };

  // accept comment
  const acceptToComment = (commentID) => {
    swal({
      title: "آیا از ثبت اطمینان دارید؟",
      icon: "warning",
      buttons: ["NO", "YES"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/comments/accept/${commentID}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "ثبت با موفقیت انجام شد",
              icon: "success",
              buttons: "OK",
            }).then(() => getAllComments());
          }
        });
      }
    });
  };

  // Reject comment
  const rejectToComment = (commentID) => {
    swal({
      title: "آیا از رد اطمینان دارید؟",
      icon: "warning",
      buttons: ["NO", "YES"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/comments/reject/${commentID}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "رد با موفقیت انجام شد",
              icon: "success",
              buttons: "OK",
            }).then(() => getAllComments());
          }
        });
      }
    });
  };

  return (
    <>
      <DataTable title={"کامنتها"}>
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th> کاربر </th>
              <th> دوره </th>
              <th> امتیاز </th>
              <th> مشاهده کامنت </th>
              <th>پاسخ</th>
              <th>تایید</th>
              <th>ویرایش</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((coment, index) => (
              <tr>
                <td
                  className={
                    coment.answer === 1 ? "answer-comment" : "no-answer-comment"
                  }
                >
                  {index + 1}
                </td>
                <td>{coment.creator.name} </td>
                <td>{coment.course} </td>
                <td>
                  {Array(5 - coment.score)
                    .fill(0)
                    .map((item) => (
                      <img src="/images/svgs/star.svg"></img>
                    ))}
                  {Array(coment.score)
                    .fill(0)
                    .map((item) => (
                      <img src="/images/svgs/star_fill.svg"></img>
                    ))}
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary edit-btn"
                    onClick={() => showCommentBody(coment.body)}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary edit-btn"
                    onClick={() => answerToComment(coment._id)}
                  >
                    پاسخ
                  </button>
                </td>

                {coment.answer === 1 ? (
                  <td>
                    <button
                      type="button"
                      class="btn btn-primary edit-btn"
                      onClick={() => rejectToComment(coment._id)}
                    >
                      رد
                    </button>
                  </td>
                ) : (
                  <td>
                    <button
                      type="button"
                      class="btn btn-primary edit-btn"
                      onClick={() => acceptToComment(coment._id)}
                    >
                      تایید
                    </button>
                  </td>
                )}

                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    onClick={() => removecoment(coment._id)}
                  >
                    حذف
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    onClick={() => banComment(coment.creator._id)}
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
