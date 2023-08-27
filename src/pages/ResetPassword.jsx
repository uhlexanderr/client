import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.1)
  ),
  url("../assets/bg/reset-password-bg.jpg") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
`;

const Input = styled(Field)`
  width: 90%;
  margin: 10px 0px;
  padding: 10px;
  font-size: 16px;
  font-weight: 400;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: black;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;

  &:disabled {
    background-color: gray;
    color: white;
    cursor: not-allowed;
  }
`;

const ErrorContainer = styled.div`
  margin-bottom: 10px;
`;

const Error = styled.div`
  color: red;
`;

const NavbarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background-color: white;
`;

const AnnouncementWrapper = styled.div`
  position: fixed;
  top: 60px; /* Adjust this value according to your Navbar's height */
  left: 0;
  width: 100%;
  z-index: 99; /* Lower z-index than Navbar to display below it */
`;

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const ResetPassword = () => {
  const { token } = useParams();

  const handleResetPassword = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(`/api/reset-password/${token}`, values);
      console.log(response.data); // Success message
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
            <NavbarWrapper>
        <Navbar />
      </NavbarWrapper>
      <AnnouncementWrapper>
        <Announcement />
      </AnnouncementWrapper>
      <Wrapper>
        <Title>RESET PASSWORD</Title>
        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleResetPassword}
        >
          {({ isSubmitting }) => (
            <Form>
              <Input type="password" name="password" placeholder="New Password" />
              <ErrorContainer>
                <ErrorMessage name="password" component={Error} />
              </ErrorContainer>

              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
              />
              <ErrorContainer>
                <ErrorMessage name="confirmPassword" component={Error} />
              </ErrorContainer>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Loading..." : "RESET"}
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Container>
  );
};

export default ResetPassword;
