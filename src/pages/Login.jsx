import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../redux/apiCalls";
import { Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  ),
  url("../assets/bg/login-bg.jpg") center;
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
  font-size: 20px;
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
  margin-bottom: 5px;
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

const CircularLogo = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 20px;
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleLogin = async (values) => {
    try {
      await login(dispatch, values);
      // Handle successful login here (e.g., redirect to dashboard)
    } catch (error) {
      console.error(error);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
        {/* Circular logo */}
        <CircularLogo>
          <LogoImage src="../assets/bg/Logo.png" alt="Your Logo" />
        </CircularLogo>

        <Title>LOG IN</Title>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <Input type="text" name="username" placeholder="Username" />
            <ErrorContainer>
              <ErrorMessage name="username" component={Error} />
            </ErrorContainer>

            <Input type="password" name="password" placeholder="Password" />
            <ErrorContainer>
              <ErrorMessage name="password" component={Error} />
            </ErrorContainer>

            <Button type="submit" disabled={isFetching}>
              {isFetching ? "Loading..." : "LOG IN"}
            </Button>

            <ErrorContainer>
              {isFetching ? (
                <Error>Loading...</Error>
              ) : (
                <ErrorMessage name="general" component={Error} />
              )}
            </ErrorContainer>
            <StyledLink to="/forgot-password">Forgot Password</StyledLink>
            <StyledLink to="/register">Create an Account</StyledLink>
            {error && <Error>{error}</Error>}
          </Form>
        </Formik>
      </Wrapper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity="error"
          elevation={6}
          variant="filled"
        >
          Invalid credentials. Please try again.
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default Login;