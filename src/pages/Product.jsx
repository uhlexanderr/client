import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Add, Remove } from '@material-ui/icons';
import { publicRequest } from '../requestMethods';
import { addProduct } from '../redux/cartRedux';
import { mobile } from '../responsive';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

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
  font-size: 21px;
  font-weight: 300;
  white-space: pre-wrap;
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
  font-weight: 400;
`;
const FilterColorDropdown = styled.select`
  margin: 10px;
  padding: 5px;
  border: 2px solid black;
  font-size: 14px;
`;
const FilterSize = styled.select`
  margin: 10px;
  padding: 5px;
  border: 2px solid black;
  font-size: 14px;
`;
const FilterSizeOption = styled.option`
  font-size: 14px;
`;
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
const Amount = styled.input`
  width: 50px;
  height: 30px;
  border: 2px solid black;
  border-radius: 10px;
  text-align: center;
  margin: 0px 5px;
  font-size: 16px;
  font-weight: 600;
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

  &:disabled {
    background-color: lightgray;
    cursor: not-allowed;
  }
`;

const formatPrice = (price) => {
  if (typeof price !== 'number' || isNaN(price)) {
    return '';
  }
  return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    let isMounted = true;

    const getProduct = async () => {
      try {
        const res = await publicRequest.get('/products/find/' + id);
        if (isMounted) {
          setProduct(res.data);
        }
      } catch (error) {
        console.log('Error fetching product:', error);
      }
    };

    getProduct();

    // Cleanup function to cancel the ongoing operation if the component is unmounted
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleQuantity = (type) => {
    if (type === 'decrease') {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    if (!currentUser) {
      setShowErrorSnackbar(true);
    } else if (color && size) {
      dispatch(addProduct({ ...product, quantity, color, size }));
      setShowSuccessSnackbar(true);
      setTimeout(() => {
        setShowSuccessSnackbar(false);
      }, 2500);
    } else {
      alert('Please choose a color and size.');
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
    }
  };

  const handleCloseSuccessSnackbar = () => {
    setShowSuccessSnackbar(false);
  };

  const handleCloseErrorSnackbar = () => {
    setShowErrorSnackbar(false);
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
            ₱ <b>{formatPrice(product.price)}</b>
          </Price>
          <FilterContainer>
            <Filter>
              <FilterTitle></FilterTitle>
              <FilterColorDropdown
                onChange={(e) => setColor(e.target.value)}
                value={color}
              >
                <option disabled value="">
                  Choose Color
                </option>
                {product.color?.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </FilterColorDropdown>
            </Filter>
            <Filter>
              <FilterTitle></FilterTitle>
              <FilterSize
                onChange={(e) => setSize(e.target.value)}
                value={size}
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
              <Amount
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <Icon>
                <Add onClick={() => handleQuantity('increase')} />
              </Icon>
            </AmountContainer>
            <Button onClick={handleClick} disabled={!color || !size}>
              ADD TO CART
            </Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Footer />
      <Snackbar open={showSuccessSnackbar} autoHideDuration={1500} onClose={handleCloseSuccessSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}> 
        <MuiAlert onClose={handleCloseSuccessSnackbar} severity="success" elevation={6} variant="filled">
          Product added to cart!
        </MuiAlert>
      </Snackbar>
      <Snackbar open={showErrorSnackbar} autoHideDuration={2500} onClose={handleCloseErrorSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}> 
        <MuiAlert onClose={handleCloseErrorSnackbar} severity="error" elevation={6} variant="filled">
          Please log in to add the product to your cart.
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default Product;
