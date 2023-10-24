import React, { Fragment, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AuthForm from "./components/Auth/AuthForm";
import Navbar from "./components/Layout/Navbar";
import Compose from "./components/Emails/Compose";
import ForgotPassFrom from "./components/Auth/ForgotPassFrom";
// import Home from "./components/Emails/Home";
import Inbox from "./components/Emails/Inbox";
import Message from "./components/Emails/Message";
// import Unseend from './components/Emails/Unseend';
import SideBar from "./components/Emails/SideBar";
import { sendEmailData, getEmailData } from "./store/action-thunk";
import Sent from "./components/Emails/Sent";

let isInitial = true;
function App() {
  const token = useSelector((state) => state.auth.token);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const isVisible = useSelector((state) => state.isVisible.isVisible);
  const inbox = useSelector((state) => state.inbox);
  const isLoggedIn = !!token;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmailData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (inbox.changed) {
      dispatch(sendEmailData(inbox));
    }
  }, [inbox, dispatch]);

  return (
    <Fragment>
      <div className={`App ${darkMode ? "dark" : "blue"}`}>
        <Navbar />

        <div style={{ display: "flex" }}>
          {isLoggedIn && <SideBar />}
          <div>
            <Routes>
              <Route path="/auth" element={!isLoggedIn && <AuthForm />} />
              <Route path="/auth/ForgotPassWord" element={<ForgotPassFrom />} />

              <Route
                exact
                path="/compose"
                element={isLoggedIn && isVisible && <Compose />}
              />

              <Route exact path="/inbox" element={isLoggedIn && <Inbox />} />
              <Route
                exact
                path="/inbox/:inboxId"
                element={isLoggedIn && <Message />}
              />

              <Route exact path="/send" element={isLoggedIn && <Sent />} />
              <Route
                exact
                path="/inbox/:inboxId"
                element={isLoggedIn && <Message />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
