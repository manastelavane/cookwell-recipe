import React from 'react'
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { googlesignin } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const OneTap = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    useGoogleOneTapLogin({
        onSuccess: res => {
          try {
            dispatch(googlesignin(res,navigate))
            // setUser(JSON.parse(localStorage.getItem('profile')))
          } catch (error) {
            console.log(error);
          }
        },
        onError: () => {
          console.log('Google Sign In was unsuccessful. Try again later')
        },
      });
  return (
    <div>
      
    </div>
  )
}

export default OneTap
