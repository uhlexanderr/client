import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import { mobile } from '../responsive';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${mobile({ padding: '10px' })}
`;

const Title = styled.h1`
  font-weight: 700;
  text-align: center;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => (props.type === 'filled' ? 'none' : '')};
  background-color: ${(props) => (props.type === 'filled' ? 'black' : 'transparent')};
  color: ${(props) => (props.type === 'filled' ? 'white' : '')};
  margin: 5px 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 100px;
  margin-bottom: 100px;

  ${mobile({ flexDirection: 'column' })}
`;

const Success = () => {
  const history = useHistory();

  const handleBackToHomepage = () => {
    history.push('/');
  };

  const handleViewOrders = () => {
    history.push('/orders');
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ButtonWrapper>
        <Title>ORDER PLACED SUCCESSFULLY!</Title>
          <TopButton onClick={handleBackToHomepage}>BACK TO HOMEPAGE</TopButton>
          <TopButton type="filled" onClick={handleViewOrders}>
            VIEW ORDERS
          </TopButton>
        </ButtonWrapper>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Success;
