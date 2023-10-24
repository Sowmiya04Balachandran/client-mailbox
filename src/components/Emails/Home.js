import React, { Fragment } from "react";
import SideBar from "../Emails/SideBar";
import Inbox from "../Emails/Inbox";
import Compose from './Compose'
import { useSelector } from "react-redux";


const Home = () => {
  const isVisible=useSelector((state)=>state.isVisible.isVisible)
  return (
    <Fragment>
      <div style={{ display: "flex", backgroundColor: "#f8f9fa",}}>
        <SideBar />
        
        {isVisible&&<Compose/>}
      
        <div>
        {  <Inbox/>}
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
