import React from 'react';
import { Box, Button, Snackbar, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundImage: `url(${'https://w.forfun.com/fetch/05/05eeb93a2e41734ecb6044146351f11e.jpeg'})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '300px',
      padding: '24px',
      borderRadius: '8px',
      backgroundColor: '#fff',
      boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
    },
    notification: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4caf50',
        color: '#fff',
        height: '50px',
      },
  }));

const Signup = () => {
    const navigate = useNavigate()
  const [notification, setNotification] = React.useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const fullName = form.elements.namedItem('fullName') as HTMLInputElement;
    const email = form.elements.namedItem('email') as HTMLInputElement;
    const password = form.elements.namedItem('password') as HTMLInputElement;
    const plan = form.elements.namedItem('plan') as HTMLInputElement;

    try {
      const response = await axios.post(
        'http://localhost:8082/api/register',
        {
          name: fullName.value,
          email: email.value,
          password: password.value,
          plan: plan.value
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      setNotification('User created'); // Set success message
      navigate('/')
    } catch (error) {
      setNotification(error.response.data.message); // Set error message
    }
  };

  const handleNotificationClose = () => {
    setNotification('');
  };

  const classes = useStyles();

  return (
    <Box className={classes.root} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Sign Up
      </Typography>
      <Box className={classes.form} component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column' }}>
        <TextField name="fullName" label="Full Name" margin="normal" />
        <TextField name="email" label="Email" type="email" margin="normal" />
        <TextField name="password" label="Password" type="password" margin="normal" />
        <TextField name="plan" label="Plan" type="plan" margin="normal" value="Basic" disabled />
        <Button variant="contained" type="submit">
          Sign Up
        </Button>
      </Box>
      <Snackbar className={classes.notification} open={notification !== ''} autoHideDuration={5000} onClose={handleNotificationClose} message={notification} />
    </Box>
  );
};

export default Signup;
