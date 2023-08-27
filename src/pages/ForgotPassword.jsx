import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  ),
  url("../assets/bg/forgot-password-bg.jpg") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
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
  margin-bottom: 10px;
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

const StyledLink = styled(Link)`
  margin: 5px 0px;
  font-size: 18px;
  text-decoration: underline;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  color: inherit;
`;

const ErrorContainer = styled.div`
  margin-bottom: 10px;
`;

const Error = styled.div`
  color: red;
`;

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPassword = () => {
  const handleForgotPassword = async (values) => {
    // Handle forgot password logic here
    console.log(values);
  };

  return (
    <>
      <NavbarWrapper>
        <Navbar />
      </NavbarWrapper>
      <AnnouncementWrapper>
        <Announcement />
      </AnnouncementWrapper>
      <Container>
        <Wrapper>
        <Title>FORGOT PASSWORD</Title>
<Formik
  initialValues={{ email: "" }}
  validationSchema={validationSchema}
  onSubmit={handleForgotPassword}
>
  <Form>
    <div>
      Please provide the email, phone number, or username associated with your account. We'll send you instructions to reset your password.
    </div>
    <Input type="email" name="email" placeholder="Email" />
    <ErrorContainer>
      <ErrorMessage name="email" component={Error} />
    </ErrorContainer>

    <Button type="submit">RESET PASSWORD</Button>

      <StyledLink to="/login">Back to Log In</StyledLink>
  </Form>
</Formik>
        </Wrapper>
      </Container>
    </>
  );
};

export default ForgotPassword;
