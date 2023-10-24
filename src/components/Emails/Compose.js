import React, { Fragment, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { composeVisible } from '../../store/isVisible';
import { useNavigate } from "react-router-dom";
import {addItemToEmail}from '../../store/inbox-slice';

function StaticExample() {
  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  // const email = localStorage.getItem('endpoint');
  const dispatch = useDispatch();

  const composeHandler = () => {
    navigate("/inbox", { replace: true });
    dispatch(composeVisible());
  };

  const toEmailHandler = (e) => {
    setToEmail(e.target.value);
  };

  const subjectHandler = (e) => {
    setSubject(e.target.value);
  };

  const messageHandler = (html) => {
    setMessage(html);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // try {
    //   const response = await fetch(`https://email-box-client-c4aef-default-rtdb.firebaseio.com/${email}/emails.json`, {
    //     method: "POST",
    //     body: JSON.stringify({
    //       date: new Date().toISOString(),
          
    //       toEmail,
    //       subject,
    //       message,
    //     }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   if (!response.ok) {
    //     throw new Error(`Failed to send data: ${response.statusText}`);
    //   }

    //   const responseData = await response.json();
    //   console.log("Data sent successfully:", responseData);
    // } catch (error) {
    //   console.error("Error:", error);
    // }

    if (toEmail === "") {
      return alert("Receiver EmailId is Required");
    }

    if (subject === "") {
      return alert("Subject is Required");
    }

    if (message === "") {
      return alert("Message is Required");
    }


    dispatch(addItemToEmail({
      date: new Date().toISOString(),
      id:Math.random().toString(),
       toEmail,
        subject,
       message,
    }))
  };




  return (
    <Fragment>
      <div className="modal show" style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
      }}>
        <Modal.Dialog>
          <Modal.Header closeButton onClick={composeHandler}>
            <Modal.Title>New Message</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form onSubmit={submitHandler}>
              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="to"
                  placeholder="Email"
                  value={toEmail}
                  onChange={toEmailHandler}
                  style={{ background: "#edf6f9" }}
                />
                <label className="form-label" htmlFor="to">
                  To
                </label>
              </div>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  placeholder="Subject"
                  value={subject}
                  onChange={subjectHandler}
                  style={{ background: "#edf6f9" }}
                />
                <label className="form-label" htmlFor="subject">
                  Subject
                </label>
              </div>

              <div className="form-floating">
                <label className="form-label" htmlFor="message">
                  Message
                </label>
                <ReactQuill
                  value={message}
                  onChange={messageHandler}
                  style={{
                    background: "#edf6f9",
                    height: "10rem",
                  }}
                />
                <br />
              </div>

              <Modal.Footer>
                <Button variant="secondary" onClick={composeHandler}>Close</Button>
                <Button variant="primary" type="submit">
                  Send
                </Button>
              </Modal.Footer>

            </form>
          </Modal.Body>
        </Modal.Dialog>
      </div>
    </Fragment>
  );
}

export default StaticExample;
