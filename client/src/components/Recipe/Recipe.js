import React,{useEffect,useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {BiTimer} from 'react-icons/bi'
import { Doughnut} from "react-chartjs-2";

import {Dialog,DialogActions,DialogContent,DialogTitle,Button,Typography} from "@material-ui/core";
import { Rating } from '@mui/material';

import { getCard,newComment,getRecommendSearch } from '../../actions/cards';
import Navbar from '../Navbar/Navbar';
import LoaderSmall from '../Loader/LoaderSmall'
import CommentsCard from './CommentsCard.js';
import ActionAreaCard from '../Card/Card';
import Ingredients from './Ingredients';
import Loader from '../Loader/Loader'
import './Recipe.css'
import VideoComponent from '../Video/VideoComponent';
import EditIcon from '@mui/icons-material/Edit';

const Recipe = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const { card,isLoading,isRecomendLoading,recommend} = useSelector((state) => state.cards);
  // console.log(card)
  // const { success, error: reviewError } = useSelector((state) => state.newCommentReducer);
  const [curcomment,setCurcomment]=useState('')
  const [rating,setRating]=useState(0)
  const [open, setOpen] = useState(false);
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(()=>{
    if(!user){
      navigate('/auth')
    }
  },[user,navigate])
  useEffect(() => {
    dispatch(getCard(id));
  }, [id,dispatch]);

  useEffect(() => {
    if(card){
      dispatch(getRecommendSearch({ Keywords: card?.RecipeIngredientParts.join(',') ,category:card?.RecipeCategory}));
    }
  }, [dispatch,card]);
      
  const commentSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", curcomment);
    myForm.set("CardId", card?._id);
    myForm.set("UserId", user?.result?._id);
    myForm.set("UserName", user?.result?.name);
    dispatch(newComment(myForm));
    // dispatch(getCard(id))
    setOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (isLoading) {
    return (
      <>
        <Loader/>
      </>
    );
  }

  const doughnutState = {
    labels: ["Carbs", "Proteins","Fats"],
    datasets: [
      {
        backgroundColor: ["#f94642", "#3177bb","#fda120"],
        hoverBackgroundColor: ["#ff7f7d","#3177bb", "#fda120"],
        data: [card?.CarbohydrateContent,card?.ProteinContent
              ,card?.FatContent],
      },
    ],
  };

  const submitCommentToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  let recommendedCards = recommend.filter(({ _id }) => _id !== card._id);
  recommendedCards=recommendedCards.slice(0, Math.min(4,recommendedCards.length));
    
  return (
    <>
    <Navbar/>
    <section className='recipe-header'>
      <div className='main-content'>
        <div className='outer-two-container'>
          <div className='two-container'>
            <div className='two-container-content'>
              <div className='two-container-content-time'>
                <ul className='cooking-times'>
                  <li className='cooking-times-items'>
                    <div className='time'>
                      <div className='time__label'>
                        <p className='time-label'>PREP TIME</p>
                      </div>
                      <div className='time__value'>
                        <div className='time-value-icon'>
                          <BiTimer className='timer-icon'/>
                        </div>
                        <p className='time-value'>
                          {card?.PrepTime}&nbsp; 
                          <span className='time-value__unit'>min</span>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className='cooking-times-items'>
                    <div className='time'>
                      <div className='time__label'>
                        <p className='time-label'>COOK TIME</p>
                      </div>
                      <div className='time__value'>
                        <div className='time-value-icon'>
                          <BiTimer className='timer-icon'/>
                        </div>
                        <p className='time-value'>
                          {card?.CookTime}&nbsp; 
                          <span className='time-value__unit'>min</span>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className='cooking-times-items'>
                    <div className='time'>
                      <div className='time__label'>
                        <p className='time-label'>READY TIME</p>
                      </div>
                      <div className='time__value'>
                        <div className='time-value-icon'>
                          <BiTimer className='timer-icon'/>
                        </div>
                        <p className='time-value'>
                          {card?.TotalTime}&nbsp; 
                          <span className='time-value__unit'>min</span>
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className='two-container-content-header'>
                <h1 style={{color:"black"}} className='header__header'>{card?.Name}</h1>  
                <div className='header__rating'>
                  <div className='header__rating'>
                    <Rating name="half-rating" value={card?.AggregatedRating} precision={0.5} readOnly />&nbsp;&nbsp;
                    <span className='rating-count'>{card?.CommentsCount} ratings</span>
                  </div>      
                </div>
                <div className='header__text'>
                  {card?.Description}
                </div>
                {/* <div className="tags">  
                  {
                    card?.Keywords.map((keyword)=>(
                      <span key={keyword}>{keyword}</span>
                    ))
                  }
                </div> */}
              </div>
            </div>
            <div className='two-container-image'>
              <img src={card?.Images[0]} alt="imageOfRecipe" className="recipe-image"/>
            </div>
          </div>
        </div>
        <div className='nutrients-info-container'>
          <div className='nutrients-info'>
            <div className='nutrients'>
              <ul className='ul-nutrients'>
                <li className='li-nutrients'>Carbohydrates : {card?.CarbohydrateContent}g</li>
                <li className='li-nutrients'>Sugar Content : {card?.SugarContent}g</li>
                <li className='li-nutrients'>Proteins : {card?.ProteinContent}g</li>
                <li className='li-nutrients'>Cholestrol Content : {card?.CholesterolContent}mg</li>
                <li className='li-nutrients'>Fats : {card?.FatContent}g</li>
                <li className='li-nutrients'>Fibre Content : {card?.FiberContent}g</li>
                <li className='li-nutrients'>Calories : {card?.Calories}cal</li>
                <li className='li-nutrients'>Sodium Content : {card?.SodiumContent}mg</li>
              </ul>
            </div>
          </div>
          <div className='graph'>
            <Doughnut data={doughnutState} />
          </div>
        </div>
        <VideoComponent />
        <Ingredients card={card}/>
        <div className='steps'>
          <Typography variant="h4">Recipe Steps :</Typography>
          <div className='steps-box'>
            <ol>
              {
                card?.RecipeInstructions.map((rec)=>(
                  <li key={rec}>{rec}</li>
                ))   
              }
            </ol>
          </div>
        </div>
        <div className='myreview-button'>
          <button onClick={submitCommentToggle} className="submitReview">
            Write a Comment &nbsp;<EditIcon/>
          </button>
        </div>
        <h3 className="commentsHeading">Comments</h3>
        <Dialog
          aria-labelledby="simple-dialog-title"
          open={open}
          onClose={submitCommentToggle}
        >
          <DialogTitle>Submit Your Comment</DialogTitle>
          <DialogContent className="submitDialog">
            <Rating
              onChange={(e) => setRating(parseInt(e.target.value))}
              value={parseInt(rating)}
              size="large"
            />
            <textarea
            maxLength='250'
            className="submitDialogTextArea"
            placeholder='Write your comment here..'
            cols="30"
            rows="5"
            value={curcomment}
            onChange={(e) => setCurcomment(e.target.value)}
            ></textarea>
          </DialogContent>
          <DialogActions>
            <Button onClick={submitCommentToggle} color="secondary">
              Cancel
            </Button>
            <Button onClick={commentSubmitHandler} color="primary">
              Comment
            </Button>
          </DialogActions>
        </Dialog>
        {card?.Comments && card.Comments[0] ? (
          <div className="comments">
            {card.Comments &&
              card.Comments.map((comment) => (
                <CommentsCard key={comment._id} comment={comment} />
            ))}
          </div>
        ) : (
              <p className="noComments">No Comments Yet</p>
        )}
        <div className='recommended'>
          <Typography variant="h5">Recommendation :</Typography>
          <div className='card-container'>
            {
              isRecomendLoading?(<LoaderSmall/>):
                (recommendedCards.length>0) && recommendedCards?.map((rec,i)=>(
                    <ActionAreaCard card={rec} key={rec._id} />
                ))
            }
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Recipe
