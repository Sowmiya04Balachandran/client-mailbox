import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from 'react-bootstrap/Card';

const Message = () => {
  const params = useParams();

  const emails = useSelector((state) => state.inbox.emails);
  const email=localStorage.getItem('endpoint')

  // Find the email with the matching id
  const emailDetails = emails.find((email) => email.id === params.inboxId);

  if (!emailDetails) {
    return <p>Something went wrong while loading email with ID {params.inboxId}</p>;
  }

  return (
    <Fragment>

<Card style={{ width: '80vw',margin:" 2rem 0 0 0",height:'80vh',backgroundColor:'#c7f9cc' }}>
      <Card.Body>
        <Card.Title style={{ paddingLeft:'3rem',backgroundColor:'#9b5de5',borderRadius:'0.4rem'}}>{emailDetails.subject}</Card.Title>
        <Card.Subtitle style={{marginTop:"2rem"}}  className="mb-2 text-muted">`This Email is from :{email}`</Card.Subtitle>
        <Card.Text style={{marginTop:"2rem", padding:'1rem', backgroundColor:'#edf6f9'}}>
        {emailDetails.message}
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
       
      </Card.Body>
    </Card>

  
    </Fragment>
  );
};

export default Message;
