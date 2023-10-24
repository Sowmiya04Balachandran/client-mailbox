import React, { Fragment, useRef, useState } from "react";
import { Button, Container } from "react-bootstrap";
//import img from "../../asset/2.gif";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth-slice";
import { useNavigate, Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import styles from "./AuthForm.module.css"; 

const AuthForm = () => {
  const [isAction, setIsAction] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleHandler = () => {
    setIsAction((prev) => !prev);
  };
  const emailRef = useRef();
  const passWordRef = useRef();
  const confirmPassWordRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current ? emailRef.current.value : '';
    const enteredPassword = passWordRef.current ? passWordRef.current.value : '';
    const confirmPassWord = confirmPassWordRef.current ? confirmPassWordRef.current.value : '';

    setIsLoading(true);

    let url;
    if (isAction) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB4mcS-F5h8tJYVTPw1pFJM93TgPV1YzQ8";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB4mcS-F5h8tJYVTPw1pFJM93TgPV1YzQ8";
    }
    if (!isAction && enteredPassword !== confirmPassWord) {
      alert("Password and confirmation password do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        let errorMessage = "Authentication failed";

        if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
        console.log(data);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      const email = data.email;
      const token = data.idToken;
      const endpoint = `/${email.replace(/\.|@/g, "")}`;
      dispatch(login({ token, endpoint }));

      navigate("/", { replace: true });
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
    
  };
/* <p style={{ backgroundColor: "#52b788", cursor: "pointer" }}*/
  
return (
  <Fragment>
    <div className={styles.backHandler}>
      <Container className={styles.formContainer}>
        <form
          onSubmit={submitHandler}
          className={`m-2 ${styles.form}`}
        >
          <div className={styles.center}>
            <h1>{isAction ? "LogIn" : "SignUp"}</h1>
            <div className="form-floating m-1">
              <input
                className="form-control"
                type="email"
                id="email"
                placeholder="Email"
                style={{ background: "#d8f3dc", width: "18rem" }}
                ref={emailRef}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating m-1">
              <input
                className="form-control"
                type="password"
                id="Password"
                placeholder="Password"
                ref={passWordRef}
                style={{ background: "#d8f3dc", width: "18rem" }}
              />
              <label htmlFor="Password">Password</label>
            </div>
            {!isAction && (
              <div className="form-floating m-1">
                <input
                  className="form-control"
                  type="password"
                  id="Confirm_Password"
                  placeholder="Confirm Password"
                  ref={confirmPassWordRef}
                  style={{ background: "#d8f3dc", width: "18rem" }}
                />
                <label htmlFor="Confirm_Password">Confirm Password</label>
              </div>
           )}
            <p style={{ backgroundColor: "#52b788", cursor: "pointer" }} onClick={toggleHandler}>
              {isAction ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
            </p>
            <div>
              <Link to="ForgotPassWord" target="_blank">
                Reset Password
              </Link>
            </div>
            {!isLoading && (
              <Button style={{ color: "#ffc6ff", marginBottom: "1rem" }} type="submit">
                {isAction ? "SignIn" : "SignUp"}
              </Button>
            )}
            {isLoading && (
              <div className="text-center">
                <Spinner animation="border" role="status"></Spinner>
              </div>
           )}
          </div>
        </form>
      </Container>
    </div>
  </Fragment>
);
};

export default AuthForm;