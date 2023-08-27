import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { changePassword } from '../redux/apiCalls';
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { mobile } from '../responsive';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  margin-bottom: 50px;

  ${mobile({ padding: '10px' })}
`;

const Title = styled.h1`
  font-weight: 600;
  text-align: center;
`;

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
  margin-top: 40px;
`;

const FormGroup = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ErrorMsg = styled.div`
  color: red;
  margin-top: 10px;
`;

const SuccessMsg = styled.div`
  color: green;
  margin-top: 10px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  & > p {
    margin-bottom: 8px;
  }
`;

const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form inputs
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password don't match.");
      return;
    }

    try {
      // Call the changePassword function with the required parameters
      await changePassword(dispatch, currentUser._id, currentPassword, newPassword);

      // Clear the form inputs and show success message
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setSuccess('Password changed successfully.');
      setError('');
      setOpenSnackbar(true);
    } catch (err) {
      setError(err.response.data.message);
      setSuccess('');
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Container>
      <Navbar />
      <Announcement/>
      <Wrapper>
        <Title>Profile Settings</Title>
        <ProfileForm onSubmit={handleSubmit}>
          <ProfileInfo>
            <p>
              <b>First Name:</b> {currentUser.firstName}
            </p>
            <p>
              <b>Last Name:</b> {currentUser.lastName}
            </p>
            <p>
              <b>Mobile Number:</b> {currentUser.mobile_number}
            </p>
            <p>
              <b>Email Address:</b> {currentUser.email}
            </p>
            <p>
              <b>Account Created at:</b> {formatDate(currentUser.createdAt)}
            </p>
          </ProfileInfo>
          <p>
              <b>Change Password</b>
            </p>
          <FormGroup>
            <Label>Current Password</Label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>New Password</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormGroup>
          <Button type="submit">Change Password</Button>
          {error && <ErrorMsg>{error}</ErrorMsg>}
          {success && <SuccessMsg>{success}</SuccessMsg>}
        </ProfileForm>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MuiAlert
            onClose={handleCloseSnackbar}
            severity="success"
            elevation={6}
            variant="filled"
          >
            Password changed successfully.
          </MuiAlert>
        </Snackbar>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Profile;
