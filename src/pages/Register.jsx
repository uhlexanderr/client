import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register } from "../redux/apiCalls";
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
  url("../assets/bg/register-bg.jpg") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  margin-top: 100px; /* Add margin to create space for fixed components */
  background-color: white;
  border-radius: 10px;
  ${mobile({ width: "80%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
`;

const Input = styled(Field)`
  flex: 1;
  min-width: 93%;
  margin: 10px 10px 0px 0px;
  padding: 10px;
`;

const ErrorMessageContainer = styled.div`
  color: red;
  margin-top: 2px;
`;

const AgreementContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const Agreement = styled.span`
  font-size: 13px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const Checkbox = styled(Field)`
  margin-right: 10px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: black;
  color: white;
  cursor: pointer;
  ${mobile({ flex: "1" })}
  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.6;
    cursor: not-allowed;
  `}
`;

const StyledLink = styled.span`
  margin: 10px 0px;
  font-size: 18px;
  text-decoration: underline;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  color: inherit;
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
  firstName: Yup.string()
    .matches(/^[\w\s]+$/, "First Name must contain only alphabets, spaces, or special characters")
    .required("First Name is required"),
  lastName: Yup.string()
    .matches(/^[\w\s]+$/, "Last Name must contain only alphabets, spaces, or special characters")
    .notOneOf([Yup.ref("firstName")], "First Name and Last Name cannot be the same")
    .required("Last Name is required"),
  username: Yup.string() 
    .min(6, "Username must be at least 6 characters")
    .max(12, "Username must be at most 12 characters")
    .required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/\d+/, "Password must contain at least one number")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
    mobile_number: Yup.string()
    .matches(/^\d{11}$/, "Mobile Number must be exactly 11 digits")
    .required("Mobile Number is required"),
  isChecked: Yup.boolean().oneOf([true], "You must agree to the terms"),
});

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleRegister = async (values) => {
    try {
      const response = await register(dispatch, {
        ...values,
        cart: currentUser && cart ? cart._id : null,
      });
      console.log(response);

      if (isMounted) {
        setOpenSnackbar(true);
        setSnackbarMessage("Registration successful!");
        setTimeout(() => {
          history.push("/login"); // Redirect to the login page after successful registration
        }, 3000);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
        setOpenSnackbar(true);
        setSnackbarMessage(error.response.data.message);
      } else if (error.response && error.response.status === 409) {
        setError("Username already taken. Please choose a different username.");
        setOpenSnackbar(true);
        setSnackbarMessage("Username already taken. Please choose a different username.");
      } else {
        setError("Registration failed. Please try again later.");
        setOpenSnackbar(true);
        setSnackbarMessage("Registration failed. Please try again later.");
      }
      console.error(error);
    }
  };

  const { currentUser, cart } = useSelector((state) => state.user);

  return (
    <Container>
      <NavbarWrapper>
      <Navbar />
      </NavbarWrapper>
      <AnnouncementWrapper>
        <Announcement />
      </AnnouncementWrapper>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            mobile_number: "", // Initialize mobile_number field
            isChecked: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            <Input type="text" name="firstName" placeholder="First Name" />
            <ErrorMessage name="firstName" component={ErrorMessageContainer} />

            <Input type="text" name="lastName" placeholder="Last Name" />
            <ErrorMessage name="lastName" component={ErrorMessageContainer} />

            <Input type="text" name="username" placeholder="Username" />
            <ErrorMessage name="username" component={ErrorMessageContainer} />

            <Input type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component={ErrorMessageContainer} />

            <Input type="text" name="mobile_number" placeholder="Mobile Number" />
            <ErrorMessage name="mobile_number" component={ErrorMessageContainer} />

            <Input type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component={ErrorMessageContainer} />

            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
            />
            <ErrorMessage name="confirmPassword" component={ErrorMessageContainer} />

            <AgreementContainer>
              <CheckboxContainer>
                <Checkbox type="checkbox" name="isChecked" />
                <Agreement>
                  By creating an account, I agree to the processing of my personal data
                  in accordance with the <b>PRIVACY POLICY</b>
                </Agreement>
              </CheckboxContainer>
              <ErrorMessage name="isChecked" component={ErrorMessageContainer} />
            </AgreementContainer>

            {error && <ErrorMessageContainer>{error}</ErrorMessageContainer>}

            <Button type="submit">CREATE ACCOUNT</Button>
            <StyledLink onClick={() => history.push("/login")}>Log In</StyledLink>
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
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity="error"
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default Register;