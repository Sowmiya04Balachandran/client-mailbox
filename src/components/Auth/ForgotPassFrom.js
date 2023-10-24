import React, { Fragment, useState } from "react";
import {
  Form,
  Button,
  Alert,
  Container,
  Row,
  Col,
  Card,
  Spinner,
} from "react-bootstrap";

import axios from "axios";

const ForgotPassFrom = (props) => {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setSLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSLoading(true);
    try {
      await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB4mcS-F5h8tJYVTPw1pFJM93TgPV1YzQ8",
        {
          requestType: "PASSWORD_RESET",
          email: email,
        }
      );
      setIsSent(true);
    } catch (err) {
      setError(err.response.data.error.message);
    } finally {
      setSLoading(false);
    }
  };

  return (
    <Fragment>
      <Card>
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={6}>
              <div className="mt-5">
                {isSent ? (
                  <Alert variant="success">
                    Password reset email sent! Please check your inbox.
                  </Alert>
                ) : (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="email">
                      <Form.Label>Enter Your Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                        autoFocus // Focus on this field when the modal opens
                      />
                    </Form.Group>
                    <div className="text-center">
                      {/* Center the button */}
                      <Button
                        variant="danger"
                        type="submit"
                        className="m-5"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Spinner animation="border" size="sm"></Spinner>
                        ) : (
                          "Send Reset Email"
                        )}
                      </Button>
                    </div>
                  </Form>
                )}
                {error && <Alert variant="danger">{error}</Alert>}
              </div>
            </Col>
          </Row>
        </Container>
      </Card>
    </Fragment>
  );
};

export default ForgotPassFrom;
