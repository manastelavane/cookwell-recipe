import React ,{useState} from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';

import Autocompletee from './Autocomplete/Autocomplete';
import Navbar from '../Navbar/Navbar'
import './HomeStyles.css'
import Loader from '../Loader/Loader';
import OneTap from './OneTap';

import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import HomeRecipes from './HomeRecipes';

const Home = () => {
  const user=JSON.parse(localStorage.getItem('profile'));
  const {loading} = useSelector((state) => state.auth);
  const [category1, setCategory1] = useState('All');
  const [update, setUpdate] = useState(false);
  const handleButtonClick = (value) => {
    setCategory1(value);
    setUpdate(!update);
  }
  if(loading ){
    return(
      <div style={{display:'flex', justifyContent:'center'}}>
        <Loader/>
      </div>
    )
  }
  return (
    <>
      <Navbar/>
      <div className='home'>
        {user===null?<OneTap />:<></>}
        <div className='hero'>
          <div className='hero-content'>
            <h3 style={{textShadow:"2px 1px black"}}>Explore over <b style={{textShadow:"1px 1px black"}}>150,000+</b> Best Recipes over the world.</h3>
            <br/>
            <Autocompletee />
            <br/>
            <h6 style={{textShadow:"2px 1px black",textAlign:"center"}}>Can't think of any Recipe? <span className='lightfont'>Try out this Popular tags.</span></h6>
            <div className="tags">
              <span onClick={() => handleButtonClick('Dessert')}>Dessert</span>
              <span onClick={() => handleButtonClick('Lunch/Snacks')}>Lunch/Snacks</span>
              <span onClick={() => handleButtonClick('< 60 Mins')}>Quick & Easy</span>
              <span onClick={() => handleButtonClick('Chicken')}>Chicken</span>
            </div>
            <a href="#containerscroll"><div className='scrolldiv'>
            <button className='scroll-button' title='scroll'><ArrowCircleDownIcon/></button>
            </div></a>
          </div>
        </div>
        <br/>
        <HomeRecipes category1={category1} setCategory1={setCategory1}/>
      </div>
    </>
  )
}

export default Home
