import React, { useState } from "react";
import { Facebook, Instagram, LocationOn, Mail, Phone, Pinterest, Twitter } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1`
  margin: 0px 10px;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 28px;
  color: #333;
`;

const Desc = styled.p`
  margin: 20px 10px;
  font-size: 16px;
  color: #555;
  line-height: 1.6;
`;

const SocialContainer = styled.div`
  display: flex;
  margin: 0px 10px;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${mobile({ marginBottom: "10px" })}
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
  font-weight: 600;
  color: #333;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  cursor: pointer;

  // Override link color
  a {
    color: #333;
    text-decoration: none;
  }
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Footer = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleMyAccountClick = () => {
    if (!currentUser) {
      setSnackbarOpen(true);
    }
  };

  return (
    <Container>
      <Left>
        <Logo>Marasigan Drapery & Blinds</Logo>
        <Desc>
          Welcome to Marasigan Drapery & Blinds, your destination for luxury curtains and blinds. With a passion for elegance and style, we provide exquisite drapery solutions for your home or business. Our branches are conveniently located in Brgy. Pag-asa, Olongapo City and Subic, Zambales, offering you easy access to our premium collection.
        </Desc>
        <SocialContainer>
          <SocialIcon
            color="3b5999"
            onClick={() => window.open("https://www.facebook.com/marasigandraperyshowroom", "_blank")}
          >
            <Facebook />
          </SocialIcon>
          <SocialIcon
            color="e4405f"
            onClick={() => window.open("https://www.instagram.com/marasigandraperyshowroom/", "_blank")}
          >
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55acee">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="e60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>
            <Link to="/">Home</Link>
          </ListItem>
          <ListItem>
            <Link to="/products/curtains">Curtains</Link>
          </ListItem>
          <ListItem>
            <Link to="/cart">Cart</Link>
          </ListItem>
          <ListItem>
            <Link to="/products/accessories">Accessories</Link>
          </ListItem>
          <ListItem>
            <Link to="/products/decors">Home Decors</Link>
          </ListItem>
          <ListItem onClick={handleMyAccountClick}>
            <Link to="/profile">My Account</Link>
          </ListItem>
          <ListItem>
            <Link to="/wishlist">Wishlist</Link>
          </ListItem>
          <ListItem>FAQ</ListItem>
          <ListItem>
            <Link to="/orders">Your Orders</Link>
          </ListItem>
          <ListItem>Terms and Conditions</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact Us</Title>
        <ContactItem>
          <LocationOn style={{ marginRight: "10px" }} />
          OLONGAPO BRANCH: Stall #16, 19 & 45-47 Pag-asa Market, Olongapo City
        </ContactItem>
        <ContactItem>
          <LocationOn style={{ marginRight: "10px" }} />
          SUBIC BRANCH: Purok 1, Mangan-vaca National Highway, Subic, Zambales
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} />
          +63 918 905 5819
        </ContactItem>
        <ContactItem>
          <Mail style={{ marginRight: "10px" }} />
          alexalexreyesreyesgg@gmail.com
        </ContactItem>
        {/* <Payment src=""/> */}
      </Right>
      {/* Snackbar for displaying the error */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity="error" variant="filled">
          You must be logged in to access your account.
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default Footer;
