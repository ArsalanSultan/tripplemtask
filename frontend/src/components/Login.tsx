import { useEffect, useState } from 'react';
import { Box, Button,Snackbar, TextField, Typography ,Alert} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store.ts';

// import loginBackground from '../assets/login-background.jpg';

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
}));

const Login = () => {
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector(state=>state.auth)
  const navigate = useNavigate()
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState(null);
const [alertSeverity, setAlertSeverity] = useState(null);

  const classes = useStyles();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login(email, password));
  };
useEffect(()=>{
if(isAuthenticated){
  setAlertMessage('Logged in successfully!');
  setAlertSeverity('success');
  navigate('/payment')

}else{
setAlertMessage('Failed to login');
setAlertSeverity('error');}
},[isAuthenticated])
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
    <Box className={classes.root}>
      <Box className={classes.form} component="form" onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          value={email}
          onChange={(event) => setUsername(event.target.value)}
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          margin="normal"
        />
        <Button variant="contained" type="submit">
          Login
        </Button>
        <Link to ='/register' variant="text" sx={{ marginTop: '10px' }}>Sign Up</Link>
      </Box>
      <Toaster message={alertMessage} severity={alertSeverity} />
    </Box>
  );
};

export default Login;
