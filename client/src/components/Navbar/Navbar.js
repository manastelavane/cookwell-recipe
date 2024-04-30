import React,{ useEffect, useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';
import './NavbarStyles.css'
import logo from '../../Images/Websitelogo.avif'

import {  Typography, Toolbar, Avatar, Button, makeStyles } from '@material-ui/core';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ChatIcon from '@mui/icons-material/Chat';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import CancelIcon from '@mui/icons-material/Cancel';

const Navbar = () => {
    const [user] = useState(JSON.parse(localStorage.getItem('profile')));
    const [clicked,setClicked]=useState(false);
    const [scrolling,setScrolling]=useState(false)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const classes = useStyles();
    // console.log("hi")
    useEffect(()=>{
        // console.log("hi")
        
        if(user && user.result){
            dispatch({ type: actionType.AUTH, data:user });
        }
    },[dispatch,user])

    const handleClick=()=>{
        setClicked(!clicked)
    }

    const handlescroll=()=>{
        if(window.pageYOffset<=50){
            setScrolling(false)
        }else{
            setScrolling(true)
        }
    }

    window.addEventListener('scroll',handlescroll);

    function trimname(name){
        var i=name.indexOf(' ');
        name=name.substr(0,i);
        if(name.length>10) return makeStyles.substr(0,10);
        else return name;
    }

  return (
    <div>
      <nav className={scrolling?"NavbarItems scrolling":"NavbarItems"}>
        <Link to='/' className='text-decoration-none'>
            <h1 className='logo' >
                <img src={logo} height="50px" width="50px" alt='cookwell'/>
                COOKWELL 
            </h1>
        </Link>
        <div className='menu-icons' onClick={handleClick}>
            {/* <i className={clicked?"fas fa-times":"fas fa-bars"}></i> */}
            {
                clicked?(<CancelIcon className='fas fa-bars'/>):(<MenuIcon className='fas fa-times'/>)
            }
        </div>
        <ul className={clicked?"nav-menu active":"nav-menu"}>
            {/* {MenuData.map((item,index)=>{ */}
                {/* return( */}
                    <li key="1">
                        <Link to="/" className="nav-links">
                            <span><HomeIcon/></span>
                            Home
                        </Link>
                    </li>
                    <li key="2">
                        <Link to="/new" className="nav-links">
                        <span><WhatshotIcon/></span>New
                        </Link>
                    </li>
                    <li key="3">
                        <Link to="/contribute" className="nav-links">
                        <span><AddCircleIcon/></span>Contribute
                        </Link>
                    </li>
                    <li key="4">
                        <Link to="/chat" className="nav-links">
                        <span><ChatIcon/></span>Chat
                        </Link>
                    </li>
                {/* ) */}
            {/* })} */}
            <li key='Sign Up' className='signup'>
                <Toolbar className={classes.toolbar}>
                    {user?.result ? (
                        <div className={classes.profile}>
                            <Avatar onClick={()=>navigate('/profile')} className={classes.purple} alt={user?.result.name} src={user?.result?.selectedFile}></Avatar>
                            <Typography onClick={()=>navigate('/profile')} className="userName" variant="h6">{trimname(user?.result.name)}</Typography>
                        </div>
                    ) : (
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                    )}
                </Toolbar>
            </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
