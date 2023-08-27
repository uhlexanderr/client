import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import { useSelector, useDispatch } from 'react-redux'; 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { InfoOutlined } from '@material-ui/icons';
import { createOrder } from '../redux/apiCalls';
import { clearCart } from '../redux/cartRedux';
import { useHistory } from 'react-router-dom';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  margin-bottom: 20px;
`;

const TextField = styled.input`
  width: 92%;
  padding: 10px;
  font-size: 16px;
  margin-top: 10px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
  border: none;
  margin-bottom: 100px;
  margin-top: 10px;
  align-items: center;
`;

const CartItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 20px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.span`
  font-weight: 500;
`;

const ProductPrice = styled.span`
  font-size: 14px;
  color: gray;
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-right: 10px;
  outline: 0.5px solid;
`;
const ErrorText = styled.div`
  color: red;
  font-size: 16px;
  margin-top: 5px;
`;

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

const GcashPayment = () => {
  const cart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  // Combine the cart products
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

  // Calculate the total of all products in the cart
  const calculateTotal = () => {
    return combineProducts().reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  // Form validation schema
  const validationSchema = Yup.object().shape({
    referenceNumber: Yup.string()
      .matches(/^[0-9]{12}$/, 'Reference number must be 12 digits')
      .required('Reference number is required'),
  });

  const handleOrderConfirmation = async (values) => {
    try {
      // Combine user details and cart products to create the order object
      const order = {
        userId: currentUser._id,
        username: currentUser.username,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        products: combineProducts(),
        amount: calculateTotal(),
        reference_number: values.referenceNumber,
        status: 'Pending',
      };

      // Call the createOrder function to store the order in the database
      const newOrder = await createOrder(dispatch, order);

      // Optionally, you can handle the response if needed
      console.log('Order created:', newOrder);
      // Perform any additional actions after order confirmation if needed
      // For example, you can clear the cart or redirect to a success page.
      dispatch(clearCart());
      history.push('/success');

    } catch (error) {
      // Handle errors if necessary
      console.error('Error creating order:', error);
    }
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Pay using GCash</Title>

        <CartItemContainer>
          {combineProducts().map((product) => (
            <CartItem key={`${product._id}-${product.color}-${product.size}`}>
              <Image src={product.img} alt={product.title} />
              <Details>
                <ProductName>{product.title}</ProductName>
                <div>
                  <span>Quantity: {product.quantity}</span>
                  <ProductColor color={product.color} />
                  <span>Size: {product.size}</span>
                </div>
                <ProductPrice>{formatPrice(product.price)}</ProductPrice>
              </Details>
            </CartItem>
          ))}
        </CartItemContainer>
        <p>
              <b>First Name:</b> {currentUser.firstName}
            </p>
            <p>
              <b>Last Name:</b> {currentUser.lastName}
            </p>

        <h2>Total: {formatPrice(calculateTotal())}</h2>
        <Note>
          <IconWrapper>
            <InfoOutlined />
          </IconWrapper>
          Pick-up is only available as of now. You can pick up your order at the Olongapo Branch.
        </Note>
                {/* Add the text above the TextField */}
                <div>
          <p>Send the Total amount Here:</p>
          <p>
            <b>GCash Name:</b> ALEXANDER R.
          </p>
          <p>
            <b>GCash Number:</b> 09562779112
          </p>
        </div>

        <Formik
          initialValues={{ referenceNumber: '' }}
          validationSchema={validationSchema}
          onSubmit={handleOrderConfirmation} // Use the handleOrderConfirmation function for form submission
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                type="text"
                name="referenceNumber"
                as={TextField}
                placeholder="Please input the reference number"
              />
              <ErrorMessage name="referenceNumber" component={ErrorText} />
              <SubmitButton type="submit">Confirm Order</SubmitButton>
            </Form>
          )}
        </Formik>

</Wrapper>
<Footer />
    </Container>
  );
};

// Helper function for formatting the product price
const formatPrice = (price) => {
  return price.toLocaleString('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export default GcashPayment;