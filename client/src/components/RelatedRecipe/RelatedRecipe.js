import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getRelatedCards } from '../../actions/cards';
import ActionAreaCard from '../Card/Card';
import Loader from '../Loader/Loader';
import Navbar from '../Navbar/Navbar';
import './RelatedRecipe.css'
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const RelatedRecipe = () => {
  const [user] = useState(JSON.parse(localStorage.getItem('profile')));
  const navigate=useNavigate()
    const query=useQuery()
    const dispatch=useDispatch()
    const {isLoading,relatedrecipe} = useSelector((state) => state.cards);
    useEffect(() => {
        if (!user) {
          navigate('/auth');
        }
      }, [navigate, user]);
    useEffect(()=>{
        dispatch(getRelatedCards(query.get('query')));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch])
    if(isLoading){
        return(
            <>
                <Loader/>
            </>
        )
    }
  return (
    <div >
        <Navbar/>
          <div className='related-hero'>
             <div className='related-hero-content'>
                 Search results for "{query.get('query')}"
             </div>
          </div>
          
          <div className='card-container'>
            {
                relatedrecipe.length===0?(
                <div className='recipe-container'>
                <div><h1 style={{color:'black'}}>No Recipe Found.</h1></div>
                <div><h4>If you know this recipe,then please <Link to={`/contribute`}>Contribute</Link>  to help Community. </h4></div>
                </div>):
                relatedrecipe && relatedrecipe.map((card) => (
                    <ActionAreaCard card={card} key={card._id} />
                ))
            }
          </div>
    </div>
  )
}

export default RelatedRecipe
