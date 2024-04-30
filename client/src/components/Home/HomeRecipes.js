import React ,{useState,useEffect,useRef} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link, useNavigate,useLocation } from 'react-router-dom';

import { getCards } from '../../actions/cards'
import ActionAreaCard from '../Card/Card'
import LoaderSmall from '../Loader/LoaderSmall';
import { options } from '../options';
import './HomeStyles.css'

import { Pagination, PaginationItem } from '@mui/material';
import {TextField,Autocomplete} from '@mui/material';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const HomeRecipes = ({ category1,setCategory1 }) => {
  const query = useQuery();
  let page = query.get('page') || "1";
  const location=useLocation();

  const {isLoading,cards,numberOfPages} = useSelector((state) => state.cards);

  const [inputValue, setInputValue] = useState(options[0]);
  const [category, setCategory] = useState('All');
  const previousPage = useRef(page);
  const previousCategory = useRef(category);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  useEffect(() => {
    if(category1!=='All'){
      setCategory(category1);
    }
  }, [category1,setCategory1])
  useEffect(()=>{
    if(location.pathname==='/'){
      navigate(`/card?category=All&page=1`);
    }
    else if((category==="All" && page==="1" )){
        navigate(`/card?category=All&page=1`);
        dispatch(getCards(category,page));
        previousPage.current = page;
        previousCategory.current = category;
    }
    else if(previousCategory.current !== category) {
      previousPage.current="1";
      navigate(`/card?category=${category}&page=1`);
      dispatch(getCards(category,1))
        if(page==="1" && category==="All"){
                window.scrollTo(0, 0)
              }else{
                window.scrollTo(0, 500)
              }
              previousPage.current = "1";
      previousCategory.current = category;
      }else if(previousPage.current !== page) {
        navigate(`/card?category=${category}&page=${page}`);
        dispatch(getCards(category,page))
        if(page==="1" && category==="All"){
                window.scrollTo(0, 0)
              }else{
                window.scrollTo(0, 500)
              }
              previousPage.current = page;
      previousCategory.current = category;
    }
      
  },[dispatch,page,category,navigate,location.pathname])
  if(isLoading ){
    return(
      <div style={{display:'flex', justifyContent:'center'}}>
        <LoaderSmall/>
      </div>
    )
  }
  return (
    <div>
      <div className="autocomplete-div" >
          <Autocomplete
            className='autocomplete'
            value={category}
            onChange={(event, newCategory) => {
              setCategory(newCategory);
              setCategory1(newCategory);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="disable-clearable"
            disableClearable
            options={options}
            sx={{ width: 500 }}
            renderInput={(params) => <TextField {...params} value='All' label="Select Category" />}
          />
        </div>
        <div className='card-container'>
          {isLoading?(<LoaderSmall/>):(<>{cards &&
            cards.map((card) => (
              <ActionAreaCard card={card} key={card._id} />
            ))
            }</>)
          }
        </div>
        <div className='pagination'>
          <Pagination
            className="pagination-ul"
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            size="large"
            siblingCount={0}
            color="primary"
            renderItem={(item) => (
              <PaginationItem {...item} component={Link} to={`/card?category=${category}&page=${item.page}`} />
            )}
          />
        </div>
    </div>
  )
}

export default HomeRecipes
