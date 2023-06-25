import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Add, Remove } from '@material-ui/icons';
import { publicRequest } from '../requestMethods';
import { addProduct } from '../redux/cartRedux';
import { mobile } from '../responsive';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  ${mobile({ padding: '10px', flexDirection: 'column' })}
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 85vh;
  object-fit: cover;
  border-radius: 5px;
  ${mobile({ height: '40%' })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: '10px' })}
`;
const Title = styled.h1`
  font-weight: 200;
  font-size: 44px;
`;
const Desc = styled.p`
  margin: 20px 0px;
  font-size: 24px;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;
const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: '100%' })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
  outline: 1px solid black;
`;
const FilterSize = styled.select`
  margin: 10px;
  padding: 5px;
  border: 2px solid black;
`;
const FilterSizeOption = styled.option``;
const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: '100%' })}
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Icon = styled.div`
  cursor: pointer;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;
const Button = styled.button`
  padding: 15px;
  border: 2px solid black;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Popup = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 999;
  animation: ${fadeIn} 0.3s ease-in;
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false); // Track whether to show the popup or not
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get('/products/find/' + id);
        setProduct(res.data);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching product:', error);
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === 'decrease') {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    if (color && size) {
      dispatch(addProduct({ ...product, quantity, color, size }));
      setSelectedColor(color); // Store the selected color in a separate state variable
      setSelectedSize(size); // Store the selected size in a separate state variable
      setShowPopup(true); // Show the popup
  
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    }
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>
            ₱ <b>{product.price}</b>
          </Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c) => (
                <FilterColor
                  color={c}
                  key={c}
                  onClick={() => setColor(c)}
                  style={{
                    border: color === c ? '2px solid #000' : 'none', // Add border for selected color
                  }}
                />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize
                onChange={(e) => setSize(e.target.value)}
                value={size} // Set the value to the currently selected size
              >
                <FilterSizeOption disabled value="">
                  Choose Size
                </FilterSizeOption>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Icon>
                <Remove onClick={() => handleQuantity('decrease')} />
              </Icon>
              <Amount>{quantity}</Amount>
              <Icon>
                <Add onClick={() => handleQuantity('increase')} />
              </Icon>
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
      {/* Render the popup when showPopup is true */}
      {showPopup && (
  <Popup>
    <p>Color: {selectedColor}</p> {/* Use selectedColor instead of color */}
    <p>Size: {selectedSize}</p> {/* Use selectedSize instead of size */}
    <p>Product added to cart!</p>
  </Popup>
)}
    </Container>
  );
};

export default Product;
