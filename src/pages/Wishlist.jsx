import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist, clearWishlist } from '../redux/wishlistRedux';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

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
  cursor: pointer;
  border: ${(props) => (props.type === 'filled' ? 'none' : '')};
  background-color: ${(props) => (props.type === 'filled' ? 'black' : 'transparent')};
  color: ${(props) => (props.type === 'filled' ? 'white' : '')};
  /* Add styles for disabled button */
  background-color: ${(props) => (props.disabled ? '#ccc' : '')};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

  ${mobile({ flexDirection: 'column' })}
`;

const Info = styled.div`
  flex: 3;
`;

const EmptyWishlistText = styled.h2`
  text-align: center;
  margin: 100px 0;
  font-size: 30px;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;

  ${mobile({ flexDirection: 'column' })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 20px;
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

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleRemoveFromWishlist = (product) => {
    dispatch(removeFromWishlist(product));
  };

  const handleContinueShopping = () => {
    history.push('/');
  };

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
    setIsSnackbarOpen(true);
  };

  const handleConfirmClear = () => {
    setIsClearDialogOpen(false);
    handleClearWishlist();
  };

  const handleOpenClearDialog = () => {
    setIsClearDialogOpen(true);
  };

  const handleCloseClearDialog = () => {
    setIsClearDialogOpen(false);
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  const isWishlistEmpty = wishlist.length === 0;

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Your Wishlist</Title>
        <Top>
          <TopButton onClick={handleContinueShopping}>CONTINUE SHOPPING</TopButton>
          <TopButton type="filled" onClick={handleOpenClearDialog} disabled={isWishlistEmpty}>
            CLEAR WISHLIST
          </TopButton>
        </Top>
        <Hr />
        <Bottom>
          <Info>
            {wishlist.length === 0 ? (
              <EmptyWishlistText>Your wishlist is empty.</EmptyWishlistText>
            ) : (
              wishlist.map((product) => (
                <Product key={product._id}>
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
                  </ProductDetail>
                  <PriceDetail>
                    <ProductPrice>{product.price}</ProductPrice>
                  </PriceDetail>
                  <button onClick={() => handleRemoveFromWishlist(product)}>Remove</button>
                </Product>
              ))
            )}
            <Hr />
          </Info>
        </Bottom>
      </Wrapper>
      <Footer />

      <Dialog open={isClearDialogOpen} onClose={handleCloseClearDialog}>
        <DialogTitle>Clear Wishlist</DialogTitle>
        <DialogContent>
          Are you sure you want to clear your wishlist? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseClearDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmClear} color="primary">
            Clear Wishlist
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={isSnackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleSnackbarClose} severity="success">
          Wishlist cleared successfully.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Wishlist;
