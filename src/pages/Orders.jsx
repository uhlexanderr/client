import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { mobile } from '../responsive';
import { getOrder, cancelOrder } from '../redux/apiCalls';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { InfoOutlined, HelpOutline } from '@material-ui/icons';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;

  ${mobile({ padding: '10px' })}
`;

const Title = styled.h1`
  font-weight: 600;
  text-align: center;
`;

const OrderContainer = styled.div`
  background-color: #fff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 20px;
`;

const OrderInfo = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* Apply responsive styles using the mobile helper */
  ${mobile({
    flexDirection: 'column',
    padding: '10px',
    alignItems: 'flex-start',
  })}
`;

const OrderID = styled.span`
  font-weight: 600;
`;

const OrderStatus = styled.span`
  font-weight: 600;
  margin-right: 5px;
  color: ${(props) => {
    switch (props.status) {
      case 'Pending':
        return '#4287f5';
      case 'Invalid Reference Number':
        return '#a30a5c';
      case 'Waiting for Pick-Up':
        return '#f59042';
      case 'Pickup Successful':
        return '#33c45f';
      case 'Canceled':
        return '#c43350';
      default:
        return 'blue';
    }
  }};
  
  /* Add background color based on the status color */
  background-color: ${(props) => {
    switch (props.status) {
      case 'Pending':
        return 'rgba(66, 135, 245, 0.1)';
      case 'Invalid Reference Number':
        return 'rgba(163, 10, 92, 0.1)';
      case 'Waiting for Pick-Up':
        return 'rgba(245, 144, 66, 0.1)';
      case 'Pickup Successful':
        return 'rgba(51, 196, 95, 0.1)';
      case 'Canceled':
        return 'rgba(196, 51, 80, 0.1)';
      default:
        return 'rgba(0, 0, 255, 0.1)';
    }
  }};
  padding: 8px 8px;
  border-radius: 10px;
`;


const OrderProduct = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-top: 1px solid lightgray;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 4px;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const ProductSize = styled.span`
  font-size: 16px;
`;

const ProductColor = styled.span`
  font-size: 16px;
`;

const ProductQuantity = styled.span`
  font-size: 16px;
`;

const ProductAmount = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

const NoOrdersMessage = styled.h3`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  font-size: 24px;
  margin: 100px 0;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const TotalAmount = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const ReferenceNumber = styled.h4`
  font-size: 18px;
  margin-bottom: 5px;
`;

const OrderType = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0px;

  @media only screen and (max-width: 765) {
    flex-direction: column;
    align-items: center;
  }
`;

const DropdownSelect = styled.select`
  padding: 12px 16px; /* Add your desired padding here */
  margin-bottom: 20px;
`;

const Note = styled.p`
  text-align: left; /* Change this to 'left' */
  font-size: 14px;
  color: black;
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: lightgray;
  border-radius: 50%;
  height: 20px;
  width: 20px;
  margin-right: 10px; /* Adjust the margin if needed */
`;


const CancelButton = withStyles((theme) => ({
  root: {
    backgroundColor: '#C41E3A',
    color: 'white',
    '&:hover': {
      backgroundColor: 'darkred',
    },
  },
}))(Button);

const getStatusDescription = (status) => {
  switch (status) {
    case 'Pending':
      return 'Your order is awaiting processing.';
    case 'Invalid Reference Number':
      return 'The provided reference number is invalid.';
    case 'Waiting for Pick-Up':
      return 'Your order is ready for pick-up.';
    case 'Pickup Successful':
      return 'Your order has been successfully picked up.';
    case 'Canceled':
      return 'Your order has been canceled.';
    default:
      return 'Status description not available.';
  }
};

const Orders = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [orderIdToCancel, setOrderIdToCancel] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [canceledOrderId, setCanceledOrderId] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user?._id) {
          const userOrders = await getOrder(dispatch, user._id);
          setOrders(userOrders);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, [user, dispatch]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 765) {
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
    };
  
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
  
    // Call the handleResize function once on component mount
    handleResize();
  
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const formatPrice = (price) => {
    // Check if price is valid and a number before formatting
    if (typeof price !== 'number') {
      return 'Invalid Price'; // or return any default value/error message you prefer
    }

    return price.toLocaleString('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleOpenConfirmation = (orderId, status) => {
    if (status === 'Pending') {
      setOrderIdToCancel(orderId);
      setOpenConfirmation(true);
    }
  };

  const handleCancelOrder = async () => {
    try {
      // Call the cancelOrder API
      await cancelOrder(dispatch, orderIdToCancel);
      // After the order is successfully canceled, update the order status locally
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderIdToCancel ? { ...order, status: 'Canceled' } : order
        )
      );
      // Show Snackbar with canceled orderId
      setCanceledOrderId(orderIdToCancel);
      setSnackbarOpen(true);
      // Close the confirmation dialog
      setOpenConfirmation(false);
    } catch (error) {
      console.error('Error canceling order:', error);
      // Close the confirmation dialog on error as well
      setOpenConfirmation(false);
    }
  };
  
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleClick = (status) => {
    setSelectedStatus(status);
  };

  useEffect(() => {
    setSelectedStatus('All Orders');
  }, []);  

    // Filter the orders based on the selectedStatus
    const filteredOrders = selectedStatus === 'All Orders'
    ? orders
    : orders.filter((order) => order.status === selectedStatus);

  
    // Define an array of possible order statuses
    const orderStatuses = [
      'All Orders',
      'Pending',
      'Invalid Reference Number',
      'Waiting for Pick-Up',
      'Pickup Successful',
      'Canceled',
    ];


  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Your Orders</Title>
        <OrderType>
        {showDropdown ? (
  <DropdownSelect
    value={selectedStatus}
    onChange={(e) => handleClick(e.target.value)}
  >
    {orderStatuses.map((status) => (
      <option key={status} value={status}>
        {status}
      </option>
    ))}
  </DropdownSelect>
) : (
  <ButtonGroup
    variant="contained"
    color="inherit"
    aria-label="order status filter"
    style={{ marginBottom: '20px' }}
  >
    {orderStatuses.map((status) => (
      <Button
        key={status}
        onClick={() => handleClick(status)}
        variant={selectedStatus === status ? 'contained' : 'outlined'}
      >
        {status}
      </Button>
    ))}
  </ButtonGroup>
)}
        </OrderType>
        <Hr />
        {filteredOrders.length === 0 ? (
          <NoOrdersMessage>No Orders Yet.</NoOrdersMessage>
        ) : (
          filteredOrders.map((order) => (
            <OrderContainer key={order._id}>
              <OrderInfo>
                <OrderID>Order ID: {order._id}</OrderID>
                <div>
                  <h4>Order Placed: {new Date(order.createdAt).toLocaleString()}</h4>
                </div>
              </OrderInfo>
              {order.products.map((product, index) => (
                <OrderProduct key={`${order._id}-${index}`}>
                  <ProductImage src={product.img} alt={product.title} />
                  <ProductDetails>
                    <ProductTitle>{product.title}</ProductTitle>
                    <ProductSize>Size: {product.size}</ProductSize>
                    <ProductColor>Color: {product.color}</ProductColor>
                    <ProductQuantity>Quantity: {product.quantity}</ProductQuantity>
                    {product.price ? (
<ProductAmount>Price: {formatPrice(product.price)}</ProductAmount>
) : (
<ProductAmount>Price not available</ProductAmount>
)}
</ProductDetails>
</OrderProduct>
))}
<div style={{ padding: '20px' }}>
<TotalAmount>Total Amount: {formatPrice(order.amount)}</TotalAmount>
<ReferenceNumber>Your GCash Reference Number: {order.reference_number}</ReferenceNumber>
<b>Order Status: </b>
<OrderStatus status={order.status}>
  {order.status}
</OrderStatus>
<Tooltip title={getStatusDescription(order.status)} placement="top">
    <HelpOutline style={{ fontSize: '20px', verticalAlign: 'middle', color: 'gray' }} />
  </Tooltip>
<Note>
<IconWrapper>
  <InfoOutlined />
</IconWrapper>
Pick-up is only available as of now. You can pick up your order at the Olongapo Branch.
</Note>
</div>
              <div style={{ padding: '20px' }}>
                <CancelButton
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpenConfirmation(order._id, order.status)}
                  disabled={order.status !== 'Pending'}
                >
                  Cancel Order
                </CancelButton>
                <Dialog
                  open={openConfirmation}
                  onClose={() => setOpenConfirmation(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">Confirm Order Cancelation?</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure you want to cancel this pending order?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenConfirmation(false)} color="primary">
                      No
                    </Button>
                    <Button onClick={handleCancelOrder} color="primary" autoFocus>
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
                <Snackbar
  open={snackbarOpen}
  autoHideDuration={6000}
  onClose={handleSnackbarClose}
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
>
  <MuiAlert
    onClose={handleSnackbarClose}
    severity="success"
    elevation={6}
    variant="filled"
  >
    Order ID: {canceledOrderId} successfully canceled!
  </MuiAlert>
</Snackbar>
              </div>
            </OrderContainer>
          ))
        )}
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Orders;