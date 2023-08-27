import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Add, Remove, InfoOutlined } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { clearCart, increaseProduct, decreaseProduct, removeProduct } from '../redux/cartRedux';
import { useHistory } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@material-ui/core';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import { mobile } from '../responsive';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;

  ${mobile({ padding: '10px' })}
`;

const Title = styled.h1`
  font-weight: 600;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  border: ${(props) => (props.type === 'filled' ? 'none' : '')};
  background-color: ${(props) =>
    props.disabled ? 'gray' : props.type === 'filled' ? 'black' : 'transparent'};
  color: ${(props) => (props.type === 'filled' ? 'white' : '')};
`;

const TopTexts = styled.div`
  ${mobile({ display: 'none' })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
  color: black;
  font-size: 19px;
  ${mobile({ padding: 'none' })}
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

  ${mobile({ flexDirection: 'column' })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  ${mobile({ flexDirection: 'column' })}
`;


const ProductDetail = styled.div`
  display: flex;
  align-items: flex-start; /* Align items at the top */
  justify-content: space-between;
  margin-bottom: 10px;

  ${mobile({
    flexDirection: 'column',
    alignItems: 'center',
  })}
`;

const Image = styled.img`
  width: 200px;
  height: 90%;
  margin-top: 10px;
  margin-right: 20px; /* Add margin to separate image and details */
  border-radius: 5px;

  ${mobile({
    marginRight: '0', // No margin on mobile
  })}
`;

const Details = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 20px;
  padding: 50px;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  outline: 0.5px solid;
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const ColorName = styled.span``;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;

  ${mobile({ margin: '5px 15px' })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;

  ${mobile({ marginBottom: '10px' })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => (props.type === 'total' ? '500' : '')};
  font-size: ${(props) => (props.type === 'total' ? '24px' : '')};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Note = styled.p`
  text-align: center;
  font-size: 14px;
  margin-top: 20px;
  color: black;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: lightgray;
  border-radius: 50%;
  height: 20px;
  width: 20px;
  margin-right: 5px;
`;

const GcashButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: ${(props) => (props.disabled ? 'gray' : '#007DFE')};
  color: white;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  margin-top: 10px;
`;

const RemoveButton = styled.button`
  padding: 10px;
  background-color:#C41E3A;
  color: white;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 10px;
`;

const NoCartMessage = styled.h3`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  font-size: 24px;
  margin: 100px 0;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [removeProductId, setRemoveProductId] = useState(null);
  const [decreaseProductId, setDecreaseProductId] = useState(null);

  
  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseProduct({ productId, quantity: 1 }));
  };

  const handleDecreaseQuantity = (productId) => {
    const product = combinedCartProducts.find((item) => item._id === productId);
    if (product.quantity === 1) {
      setDecreaseProductId(productId); // Set the product ID for which the user wants to decrease the quantity to 0
    } else {
      dispatch(decreaseProduct({ productId, quantity: 1 }));
    }
  };

  const handleConfirmDecreaseQuantity = () => {
    if (decreaseProductId !== null) {
      dispatch(decreaseProduct({ productId: decreaseProductId, quantity: 1 }));
      setDecreaseProductId(null); // Clear the product ID from the state
    }
  };

  const handleRemoveProduct = (productId) => {
    setRemoveProductId(productId); // Set the product ID to be removed in the state
  };

  const handleConfirmRemoveProduct = () => {
    if (removeProductId !== null) {
      dispatch(removeProduct({ productId: removeProductId }));
      setRemoveProductId(null); // Clear the product ID from the state
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleClearCartConfirmed = () => {
    dispatch(clearCart());
    setOpenDialog(false);
    setOpenSnackbar(true);
  };

  const handleClearCartCancelled = () => {
    setOpenDialog(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleGoToWishlist = () => {
    history.push('/wishlist');
  };

  const formatPrice = (price) => {
    if (typeof price !== 'undefined') {
      return price.toLocaleString('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
    return '';
  };

  // Combine the products with the same ID, color, and size
  const combineProducts = () => {
    const combinedProducts = [];
    const visitedProducts = new Set();

    for (const product of cart.products) {
      const productKey = `${product._id}-${product.color}-${product.size}`;
      if (!visitedProducts.has(productKey)) {
        const combinedProduct = { ...product };
        const sameProducts = cart.products.filter(
          (p) =>
            p._id === product._id && p.color === product.color && p.size === product.size
        );
        const totalQuantity = sameProducts.reduce((acc, p) => acc + p.quantity, 0);
        combinedProduct.quantity = totalQuantity;
        combinedProducts.push(combinedProduct);
        visitedProducts.add(productKey);
      }
    }

    return combinedProducts;
  };

  const combinedCartProducts = combineProducts();

  const handleContinueShopping = () => {
    history.push('/');
  };

  const handlePayWithGcash = () => {
    history.push('/gcash-payment');
    console.log('Paying with GCash...');
  };

  const handleGoToOrders = () => {
    history.push('/orders');
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Your Cart</Title>
        <Top>
          <TopButton onClick={handleContinueShopping}>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText onClick={handleGoToWishlist}>Your Wishlist</TopText>
            <TopText onClick={handleGoToOrders}>Your Orders</TopText>
          </TopTexts>
          <TopButton
        type="filled"
        onClick={handleOpenDialog}
        disabled={cart.products.length === 0}
      >
        CLEAR CART
      </TopButton>
        </Top>
        <Hr />
        <Bottom>
          <Info>
          {combinedCartProducts.map((product, index) => (
                  <React.Fragment key={product._id + product.color + product.size}>
                  <Product>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product: </b>
                      {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID: </b>
                      {product._id}
                    </ProductId>
                    <ColorName>
                      <b>Color: </b>
                      {product.color}
                    </ColorName>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size: </b>
                      {product.size}
                    </ProductSize>
                  </Details>
                <PriceDetail>
                <ProductPrice>
                    {formatPrice(product.price * product.quantity)}
                  </ProductPrice>
                <ProductAmountContainer>
                <Add onClick={() => handleIncreaseQuantity(product._id)} />
                <ProductAmount>{product.quantity}</ProductAmount>
                <Remove onClick={() => handleDecreaseQuantity(product._id)} />
              </ProductAmountContainer>
                  <RemoveButton onClick={() => handleRemoveProduct(product._id)}>Remove Product</RemoveButton>
                </PriceDetail>
                </ProductDetail>
                </Product>
      {index !== combinedCartProducts.length - 1 && <Hr />} {/* Add <Hr> after each product except the last one */}
    </React.Fragment>
            ))}
            <Hr />
            {cart.products.length === 0 && (
          <NoCartMessage>Your cart is empty.</NoCartMessage>
        )}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>{formatPrice(cart.total)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>{formatPrice(cart.total)}</SummaryItemPrice>
            </SummaryItem>
            <Note>
              <IconWrapper>
                <InfoOutlined />
              </IconWrapper>
              Pick-up is only available as of now. You can pick up your order at the Olongapo Branch.
            </Note>
            <GcashButton
              disabled={!cart.products || cart.products.length === 0 || cart.total === 0}
              onClick={handlePayWithGcash}
            >
              PAY USING GCASH
            </GcashButton>
            </Summary>
        </Bottom>
        <Hr />
      </Wrapper>
      <Footer />
      <Dialog open={openDialog} onClose={handleClearCartCancelled}>
        <DialogTitle>Clear Cart Items</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to clear the cart items?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClearCartCancelled} color="primary" autoFocus>
            Cancel
          </Button>
          <Button onClick={handleClearCartConfirmed} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={removeProductId !== null} onClose={() => setRemoveProductId(null)}>
        <DialogTitle>Remove Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this product from the cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRemoveProductId(null)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmRemoveProduct} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={decreaseProductId !== null} onClose={() => setDecreaseProductId(null)}>
        <DialogTitle>Remove Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this product from the cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDecreaseProductId(null)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDecreaseQuantity} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} variant="filled" severity="success">
          Cart cleared successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Cart;