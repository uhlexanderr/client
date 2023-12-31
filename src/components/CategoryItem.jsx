import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;

  &:hover {
    /* Add hover styles for the container */
    /* Example: border: 1px solid red; */
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}

  &:hover {
    /* Add hover styles for the image */
    /* Example: opacity: 0.8; */
  }
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: black;
  margin-bottom: 20px;
  opacity: 80%;
  background-color: whitesmoke;
  padding: 2px;
  border-radius: 5px;
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: whitesmoke;
  color: black;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    /* Add hover styles for the button */
    background-color: lightgray;
  }
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item.cat}`}>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
