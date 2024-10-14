import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';
import { login } from '../../redux/Auth/auth-action';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    let valid = true;
    const newErrors = {};


    if (!userData.email) {
      newErrors.email = 'Email is required.';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = 'Email address is invalid.';
      valid = false;
    }

    if (!userData.password) {
      newErrors.password = 'Password is required.';
      valid = false;
    } else if (userData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      await dispatch(login(userData));
      if (auth?.isAuth === true) {
        navigate('/dashboard');
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
    
        <TextField
          label="Email"
          fullWidth
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInput}
          margin="normal"
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Password"
          fullWidth
          type="password"
          name="password"
          value={userData.password}
          onChange={handleInput}
          margin="normal"
          error={!!errors.password}
          helperText={errors.password}
        />
        <Button type="submit" variant="contained" fullWidth style={{ marginTop: '20px' }}>
          Login
        </Button>
      </form>
      {auth?.isAuth === true && <Typography color="error">{auth?.error}</Typography>}
      <Typography variant="body2" align="center" style={{ marginTop: '20px' }}>
        Don't have an account?{' '}
        <span onClick={() => navigate('/signup')} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
          Sign up
        </span>
      </Typography>

    </Container>
  );
};

export default Login;
