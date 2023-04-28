import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Snackbar,Alert} from '@mui/material';
import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const FormContainer = styled.div`
  background-image: url('https://w.forfun.com/fetch/05/05eeb93a2e41734ecb6044146351f11e.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormWrapper = styled.div`
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
  width: 40%;

  /* Center the form container */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 16px; 
  font-weight: 500;
  margin-bottom: 8px;
`;

const StripeElementWrapper = styled.div`
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 8px;
  width: 100%;
`;

const PaymentForm: React.FC = () => {
  const navigate = useNavigate()
  const { name, email } = useSelector(state => state.auth.user) || {}
  const stripe = useStripe();
  const elements = useElements();
  // const [name, setName] = useState<string>('');
  // const [email, setEmail] = useState<string>('');
  const [alertMessage, setAlertMessage] = useState(null);
const [alertSeverity, setAlertSeverity] = useState(null);
const [enableButton,setEnableButton] = useState(false)
  const subscriptionHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const paymentMethod = await stripe?.createPaymentMethod({
        type: 'card',
        card: elements?.getElement('card')!
      })
      const response = await axios.post('http://localhost:8082/api/payment', {
        name,
        email,
        paymentMethod: paymentMethod?.paymentMethod?.id
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response) return alert('Payment failed')
      const confirm = await stripe?.confirmCardPayment(response.data?.clientSecret!);
      if (confirm?.error) return alert('payment failed')
      setAlertMessage('Payment Successfull, Subscription active');
      setAlertSeverity('success');
      if(response.status === 200){
        setEnableButton(true)
      }
    } catch (error) {
      console.log(error);
      setAlertMessage('Payment failed, Subscription inactive');
      setAlertSeverity('failed');
    }
  };
  const navigateToUsers= async()=>{
    navigate('/users')
  }
  const Toaster = ({ message, severity }) => {
    return (
      <Snackbar open={Boolean(message)} autoHideDuration={3000}>
        <Alert severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    );
  };
  return (
    <FormContainer>
      <FormWrapper>
        <FormLabel>SubScribe to see all users</FormLabel>
        <FormLabel>Name:</FormLabel>
        <TextField variant="outlined" value={name} disabled />
        <br />
        <FormLabel>Email:</FormLabel>
        <TextField variant="outlined" type="email" value={email} disabled />
        <br />
        <StripeElementWrapper>
          <CardElement options={{}} />
        </StripeElementWrapper>
        <br />
        <Button variant="contained" color="primary" onClick={subscriptionHandler}>Subscribe-5$</Button>
        <br />
        <Button variant="contained" color="primary" onClick={navigateToUsers} disabled={!enableButton}>Go to Users</Button>
      </FormWrapper>
      <Toaster message={alertMessage} severity={alertSeverity} />
    </FormContainer>
  )
}

export default PaymentForm;
