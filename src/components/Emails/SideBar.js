import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { composeVisible } from "../../store/isVisible";
//import classes from "./Inbox.module.css";
import { Nav,  Navbar,Container } from "react-bootstrap";
import {NavLink} from "react-router-dom"; // useNavigate 
import classes from './SideBar.module.css'

import {
  FaPencilAlt,
  FaInbox,
  FaRegStar,
  FaPaperPlane,
  FaFirstdraft,
  FaAngleUp,
  FaAngleDown,
  FaRegFileArchive,
  FaRegTrashAlt,
  FaEnvelope,
} from "react-icons/fa";

const SideBar = () => {
  const token = useSelector((state) => state.auth.token);
  const totalQuantity = useSelector((state) => state.inbox.totalQuantity);
  const unseenMessage = useSelector((state) => state.inbox.unseenMessage); 
  const [isMore, setMore] = useState(false);
  const isLoggedIn = !!token;
  const dispatch = useDispatch();
  // const navigate = useNavigate();


  
  /*------------->Compose Open and Close<----------- */
  const composeHandler = () => {
    // navigate("/compose", { replace: true });
    dispatch(composeVisible());
  };

  /*--------------->Open and Close More <------------------ */
  const activeMore = () => {
    setMore((prev) => !prev);
  };

  // const centerStyles = {
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "start",
  //   height: "100vh",
  //   width: "14rem",
  //   // background: "#ffffff",
  //   backdropFilter: "blur(8px)",
  // };

  // const composeStyleHandler = {
  //   // background: "#4a4e69",
  //   borderRadius: "0.3rem",
  //   height: "3rem",
  //   alignContent: "center",
  //   margin: "2rem 0 0 0",
  //   width: "8rem",
  //   marginLeft: "2rem",
  //   boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
  // };

  return (
    <Fragment>
      <Navbar  >
        <Container>
        <div  className={classes.centerStyles}>
          <div className={classes.composeStyleHandle} onClick={composeHandler}>
            <div className="pt-2" style={{ paddingInlineStart: "0.4rem" }}>
              {isLoggedIn && (
                <Nav.Link
                  as={NavLink}
                  to="/compose"
                  style={{ marginLeft: "0.8rem" }}
                >
                  <span>
                   
                    <FaPencilAlt />
                  </span>
                  <span className="pl-1">Compose</span>
                </Nav.Link>
              )}
            </div>
          </div>

{/*---------------------------------> INBOX <------------------------------ */}

          <div
            className="mt-1"
            style={{ marginLeft: "2.6rem" }}
            
          >
            <div  style={{ marginTop: "0.6rem" }}>
              {isLoggedIn && (
                <Nav.Link
                  as={NavLink}
                  to="/inbox"
                  style={{ marginLeft: "0.8rem" }}
                >
                  <span>
                    {" "}
                    <FaInbox />
                  </span>{" "}
                  <span style={{ marginLeft: "0.4rem" }}>
                    Inbox <span>{totalQuantity}</span>
                  </span>
                </Nav.Link>
              )}
            </div>



{/*---------------------------------> Unseen <------------------------------ */}   

            <div  style={{ marginTop: "0.3rem" }}>
              {isLoggedIn && (
                <Nav.Link
                  as={NavLink}
                  to="/unseen"
                  style={{ marginLeft: "0.8rem" }}
                >
                  <span>
                    <FaEnvelope />
                  </span>
                  <span style={{ marginLeft: "0.4rem" }}>
                    Unseen <span>{unseenMessage}</span>
                  </span>
                </Nav.Link>
              )}
            </div>



{/*---------------------------------> starred  <------------------------------ */}   


            <div  style={{ marginTop: "0.3rem" }}>
              {isLoggedIn && (
                <Nav.Link
                  as={NavLink}
                  to="/starred"
                  style={{ marginLeft: "0.8rem" }}
                >
                  <span>
                    <FaRegStar />
                  </span>
                  <span style={{ marginLeft: "0.4rem" }}>Starred </span>
                </Nav.Link>
              )}
            </div>



{/*---------------------------------> Sent  <------------------------------ */}   


            <div className={classes.hover} style={{ marginTop: "0.3rem" }}>
              {isLoggedIn && (
                <Nav.Link
                  as={NavLink}
                  to="/send"
                  style={{ marginLeft: "0.8rem" }}
                >
                  <span>
                    <FaPaperPlane />
                  </span>
                  <span style={{ marginLeft: "0.4rem" }}> Sent</span>
                </Nav.Link>
              )}
            </div>


            {/*---------------------------------> Drafts  <------------------------------ */}   

            <div className={classes.hover} style={{ marginTop: "0.3rem" }}>
              {isLoggedIn && (
                <Nav.Link
                  as={NavLink}
                  to="/drafts"
                  style={{ marginLeft: "0.8rem" }}
                >
                  <span>
                    <FaFirstdraft />
                  </span>
                  <span style={{ marginLeft: "0.4rem" }}> Drafts</span>
                </Nav.Link>
              )}
            </div>



{/*---------------------------------> activeMore  <------------------------------ */}    

            <div style={{ marginTop: "0.6rem" }}>
              <div onClick={activeMore}>
                {!isMore ? <FaAngleDown /> : <FaAngleUp />}
                {!isMore ? "More" : "Less"}
              </div>
              {isMore && isLoggedIn && (
                <Fragment>

 {/*---------------------------------> Archive  <------------------------------ */}  

                  <div className={classes.hover}>
                    <Nav.Link
                      as={NavLink}
                      to="/archive"
                      style={{ marginLeft: "0.8rem" }}
                    >
                      <span>
                        <FaRegFileArchive />
                      </span>{" "}
                      Archive
                    </Nav.Link>
                  </div>

    {/*---------------------------------> Trash  <------------------------------ */}  


                  <div className={classes.hover}>
                    <Nav.Link
                      as={NavLink}
                      to="/trash"
                      className={classes.navLink}
                    >
                      <span className={classes.label}>
                        <FaRegTrashAlt className={classes.icon}/>
                      </span>{" "}
                      Trash
                    </Nav.Link>
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </div>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default SideBar;
