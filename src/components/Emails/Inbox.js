import React, { Fragment} from "react";
import { FaRegStar, FaRegSquare, FaTrash } from "react-icons/fa";
import classes from "./Inbox.module.css";
import { useSelector, useDispatch } from "react-redux";
import { removeItemFromEmail } from "../../store/inbox-slice";
import {NavLink } from "react-router-dom";
// import {addItemToEmail} from '../../store/inbox-slice';
import { Nav } from "react-bootstrap";

const Inbox = () => {
  const email = useSelector((state) => state.inbox.emails);
  // const emails=localStorage.getItem('endpoint')
  const dispatch = useDispatch();

  const containerStyle = {
    marginLeft: "2rem",
    marginTop: "1.8rem",
    width: "70vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    cursor: "pointer",
  };






//   /*-------------------------> GET DATA <------------------------- */
//   const getData =useCallback( async () => {
//     try {
//       const response = await fetch(`https://email-box-client-c4aef-default-rtdb.firebaseio.com/${emails}/emails.json`, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch data');
//       }

//       const data = await response.json();

//       if (data) {
//         // Convert the Firebase response into an array
//         const emailArray = Object.keys(data).map((key) => ({
//           id: key,
//           ...data[key],
//         }));
// console.log('email from get ',emailArray )
// emailArray.map((emails)=>
// dispatch(addItemToEmail({   key:emails.id ,id:emails.id , subject:emails.subject, toEmail:emails.toEmail,message:emails.message })))
        
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   },[dispatch,emails])

//   useEffect(() => {
//     getData();
//   },[]);











// /*--------------------------------> Delete Data from BackEnd<------------------------------------------ */
const deleteHandler =(id)=>{
  dispatch(removeItemFromEmail(id));
}


  // const deleteHandler = async (id) => {

  //   dispatch(removeItemFromEmail(id));
  
  //   try {

  //     const url = `https://email-box-client-c4aef-default-rtdb.firebaseio.com/${emails}/emails/${id}.json`;
  
  //     const response = await fetch(url, {
  //       method: 'DELETE', 
  //     });
  
  //     if (!response.ok) {

  //       throw new Error(`Error deleting item with id ${id}`);
  //     }
  
      
  //     console.log(`Item with id ${id} deleted successfully`);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <Fragment>
      <div style={containerStyle}>
        {email.map((email) => (
          <div key={email.id} style={{ display: "flex",}} className={classes.hover}>
            <div>
              <FaRegSquare />
            </div>
            <div>
              <FaRegStar />
            </div>
            <div style={{ backgroundColor: "#4361ee", maxHeight: "1.4rem", borderRadius: "12px", marginLeft: "1rem" }}>
              <p>New</p>
            </div>
            <Nav.Link  as={NavLink} to={`/inbox/${email.id}`} style={{ marginLeft: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", flex: 1 }}>
              <span style={{ width: "14rem", marginLeft: "1rem" }}>{email.toEmail}</span>
              <span style={{ marginLeft: "8rem", fontSize: "1.2rem" }}>{email.subject}</span>
              <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", flex: 1 }}>
                {email.message}
              </span>
              <span style={{marginLeft:'4rem'}}> {email.date}</span>
            </Nav.Link>
            <div style={{ cursor: "pointer" }} onClick={() => deleteHandler(email.id)}>
              <FaTrash />
            </div>
            
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default React.memo(Inbox);
