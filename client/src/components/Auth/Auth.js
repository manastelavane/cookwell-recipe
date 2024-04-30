import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SIGNUP_FAIL } from '../../constants/actionTypes';

import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Alert} from '@mui/material'

import { signin, signup,googlesignin} from '../../actions/auth';
import useStyles from './AuthStyles';
import FileBase from 'react-file-base64';
import Input from './Input';

import {IoArrowBackSharp} from 'react-icons/io5'
import { GoogleLogin } from '@react-oauth/google';
import Loader from '../Loader/Loader';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '',selectedFile: '',googleId:'' };

const SignUp = () => {
  
  const {loading,isAuthenticated,error} = useSelector((state) => state.auth);
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      if(form.selectedFile===''){
        dispatch({ type: SIGNUP_FAIL, payload: "Profile Image is required." });
      }else{
        dispatch(signup(form, navigate));
      }
    } else {
      dispatch(signin(form, navigate));
    }
  };

  const googleSuccess =  (res) => {
    try {
      dispatch(googlesignin(res,navigate))
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => console.log('Google Sign In was unsuccessful. Try again later');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  useEffect(()=>{
    if(isAuthenticated){
      navigate(-1)
    }
    window.scrollTo(0, 0)
  },[dispatch,isAuthenticated,navigate])
  if(loading){
    return (
      <>
      <Loader/>
      </>
    )
  }
  return (
    <div className={classes.divcontainer}>
      {error?<><Alert severity="error" className="alert">{error}</Alert></>:<></>}
      <div className={classes.back} title="Back" onClick={()=>navigate('/')}>
        <IoArrowBackSharp/> 
      </div>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <Paper className={classes.paper} elevation={6}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              { isSignup && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
              )}
              <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
              <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
              { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
              { isSignup && <FileBase required type="file" multiple={false} onDone={({ base64 }) => setForm({ ...form, selectedFile: base64 })} /> }

            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              { isSignup ? 'Sign Up' : 'Sign In' }
            </Button>
            <GoogleLogin
            onSuccess={googleSuccess}
            onError={googleError}
            cookiePolicy="single_host_origin"
            />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode} className={classes.button}>
                  { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
    </Container>
    </div>
  );
};

export default SignUp;
