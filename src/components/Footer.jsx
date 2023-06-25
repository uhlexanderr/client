import { Facebook, Instagram, LocationOn, Mail, Phone, Pinterest, Twitter } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
 display: flex;
 ${mobile({flexDirection: "column" })}
`;
const Left = styled.div`
 flex: 1;
 display: flex;
 flex-direction: column;
 padding: 20;
`;
const Logo = styled.h1`
 margin: 0px 10px;
`;
const Desc = styled.p`
 margin: 20px 10px;
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
 background-color: #${props=>props.color};
 display: flex;
 align-items: center;
 justify-content: center;
 margin-right: 20px;
 cursor: pointer;
 ${mobile({marginBottom: "10px" })}
`;
const Center = styled.div`
 flex: 1;
 padding: 20px;
 ${mobile({display: "none" })}
`;
const Title = styled.h3`
 margin-bottom: 30px;
`;
const List = styled.ul`
 margin: 0;
 padding: 0;
 List-style: none;
 display: flex;
 flex-wrap: wrap;
`;
const ListItem = styled.li`
 width: 50%;
 margin-bottom: 10px;
 cursor: pointer;
`;
const Right = styled.div`
 flex: 1;
 padding: 20px;
 ${mobile({backgroundColor: "#fff8f8" })}
`;
const ContactItem = styled.div`
 margin-bottom: 20px;
 display: flex;
 align-items: center;
`;
// const Payment = styled.img`
//  width: 50%;
// `;
const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>Marasigan Drapery</Logo>
        <Desc>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 
        "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 
        translation by H. Rackham.</Desc>
        <SocialContainer>
            <SocialIcon color="3b5999">
                <Facebook/>
            </SocialIcon>
            <SocialIcon color="e4405f">
                <Instagram/>
            </SocialIcon>
            <SocialIcon color="55acee">
                <Twitter/>
            </SocialIcon>
            <SocialIcon color="e60023">
                <Pinterest/>
            </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
            <ListItem>Home</ListItem>
            <ListItem>Curtains</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>Accessories</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Home Decors</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>FAQ</ListItem>
            <ListItem>Order Tracking</ListItem>
            <ListItem>Terms and Conditions</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact Us</Title>
        <ContactItem><LocationOn style={{marginRight:"10px"}}/>
        OLONGAPO BRANCH: Stall #16, 19 & 45-47 Pag-asa Market, Olongapo City PH
        </ContactItem>
        <ContactItem><LocationOn style={{marginRight:"10px"}}/>
        SUBIC BRANCH: Purok 1, Mangan-vaca National Highway, Subic, Zambales PH
        </ContactItem>
        <ContactItem><Phone style={{marginRight:"10px"}}/>+63 918 905 5819</ContactItem>
        <ContactItem><Mail style={{marginRight:"10px"}}/> alexalexreyesreyesgg@gmail.com</ContactItem>
        {/* <Payment src=""/> */}
      </Right>
    </Container>
  )
}

export default Footer
