import { CREATE,FETCH_ALL,FETCH_CARD,FETCH_NEW_ALL,START_LOADING,START_RECOMMEND_LOADING,END_LOADING,NEW_COMMENT_REQUEST,NEW_COMMENT_SUCCESS,NEW_COMMENT_FAIL,FETCH_BY_SEARCH, FETCH_RELATED_ALL } from '../constants/actionTypes';

export const cards=(state = {isLoading:false,isRecomendLoading:true,cards:[],recommend:[],neww:[],relatedrecipe:[]}, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true }

    case START_RECOMMEND_LOADING:
      return {...state,isRecomendLoading:true}

    case END_LOADING:
      return { ...state, isLoading: false }

    case FETCH_ALL:
      return {...state,cards:action.payload.data,currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages};

    case FETCH_NEW_ALL:
      return {...state,neww:action.payload.data,currentnewPage: action.payload.currentPage,
        newnumberOfPages: action.payload.numberOfPages};

    case FETCH_RELATED_ALL:
      return {...state,relatedrecipe:action.payload.data};

    case FETCH_CARD:
      return { ...state, card: action.payload.card };

    case FETCH_BY_SEARCH:
      // console.log("hi",action.data)
      return { ...state, recommend: action.data,isRecomendLoading:false };

    case CREATE:
        // console.log("created",action.data)
        return {...state,isLoading: false}
    case NEW_COMMENT_REQUEST:
        return {
            ...state,
            loading: true,
        };
        case NEW_COMMENT_SUCCESS:
          // console.log(action.payload)
          return {
            ...state,
            loading: false,
            card: action.payload,
          };
          
        case NEW_COMMENT_FAIL:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
    default:
      return state;
  }
};



