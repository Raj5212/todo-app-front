import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';
import { register } from '../../redux/Auth/auth-action';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    let valid = true;
    const newErrors = {};

    if (!userData.name) {
      newErrors.name = 'Name is required.';
      valid = false;
    }

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

    if (!userData.phone) {
      newErrors.phone = 'Phone number is required.';
      valid = false;
    } else if (!/^\d{10}$/.test(userData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits long.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      await dispatch(register(userData));

      if (auth.registered === true) {
        navigate('/login');
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          type="text"
          name="name"
          value={userData.name}
          onChange={handleInput}
          margin="normal"
          error={!!errors.name}
          helperText={errors.name}
        />
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
        <TextField
          label="Phone"
          fullWidth
          type="tel"
          name="phone"
          value={userData.phone}
          onChange={handleInput}
          margin="normal"
          error={!!errors.phone}
          helperText={errors.phone}
        />
        <Button type="submit" variant="contained" fullWidth style={{ marginTop: '20px' }}>
          Sign Up
        </Button>
      </form>
      {auth.registered === false && <Typography color="error">{auth.error}</Typography>}

      <Typography variant="body2" align="center" style={{ marginTop: '20px' }}>
       Already have an account?{' '}
        <span onClick={() => navigate('/login')} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
          Login
        </span>
      </Typography>    </Container>
  );
};

export default Signup;
