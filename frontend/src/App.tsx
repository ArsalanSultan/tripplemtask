import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login.tsx';
import Signup from './components/SignUp.tsx';
import PaymentForm from './components/PaymentForm.tsx';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { login } from './store.ts';
import { useDispatch } from 'react-redux';
import Users from './components/Users.tsx';

// console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY')

const stripePromise =loadStripe('pk_test_51N17RcLaBSIgVOaAJVIKpKqHvs8v2CThggoyK1bjiPIKq0Irq8ENhAfZtJtpI1aLj8FeRwZV3w1EEFB5jFEzg4bR00L4MQTJKN')
function App() {
  const dispatch =useDispatch()
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const { email, name } = user;
      dispatch(login(email, name));
    }
  }, [dispatch]);

  return (

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/payment" element={<Elements stripe={stripePromise}><PaymentForm /></Elements>} />
      <Route path="/users" element={<Users />} />
    </Routes>
  </BrowserRouter>
  
  
  );
}

export default App;
