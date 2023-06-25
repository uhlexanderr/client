import styled from "styled-components";
import { mobile } from '../responsive';

const Container = styled.div`
 width: 100vw;
 height: 100vh;
 background: linear-gradient(
    rgba(255,255,255,0.5),
    rgba(255,255,255,0.5)
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
 background-color: white;
 border-radius: 10px;
 ${mobile({width: "80%" })}
`;
const Title = styled.h1`
 font-size: 24px;
 font-weight: 300;
`;
const Form = styled.form`
 display: flex;
 flex-wrap: wrap;
`;
const Input = styled.input`
 flex: 1;
 min-width: 40%;
 margin: 20px 10px 0px 0px;
 padding: 10px;
`;
const Agreement = styled.span`
 font-size: 12px;
 margin: 20px 0px;
`;
const Button = styled.button`
 width: 40%;
 border: none;
 padding: 15px 20px;
 background-color: black;
 color: white;
 cursor: pointer;
 ${mobile({flex: "1" })}
`;

const Register = () => {
  return (
    <Container>
    <Wrapper>
        <Title>CREATING AN ACCOUNT</Title>
        <Form>
            <Input placeholder="First Name"/>
            <Input placeholder="Last Name"/>
            <Input placeholder="Username"/>
            <Input placeholder="Email"/>
            <Input placeholder="Password"/>
            <Input placeholder="Confirm Password"/>
            <Agreement>By creating an account, I agree to the processing of my personal 
            data in accordance with tht <b>PRIVACY POLICY</b>
            </Agreement>
            <Button>CREATE ACCOUNT</Button>
        </Form>
    </Wrapper>
    </Container>
  )
}

export default Register
