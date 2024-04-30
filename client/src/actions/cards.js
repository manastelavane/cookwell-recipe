import { FETCH_ALL,FETCH_CARD,FETCH_NEW_ALL,START_LOADING,START_RECOMMEND_LOADING,END_LOADING,NEW_COMMENT_REQUEST,NEW_COMMENT_SUCCESS,FETCH_BY_SEARCH, CREATE, FETCH_RELATED_ALL} from '../constants/actionTypes';
import * as api from '../api/index.js';

//For Home page - to get all recipe cards
export const getCards = (category,page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data :{data,currentPage, numberOfPages}} = await api.fetchCards(category,page);
    dispatch({ type: FETCH_ALL, payload:{data ,currentPage, numberOfPages}});
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

//For New page - to get all recipe cards in date sorted way
export const getNewCards = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data :{data,currentPage, numberOfPages}} = await api.fetchNewCards(page);
    dispatch({ type: FETCH_NEW_ALL, payload:{data ,currentPage, numberOfPages}});
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getRelatedCards = (query) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data :{data}} = await api.fetchRelatedCards(query);
    dispatch({ type: FETCH_RELATED_ALL, payload:{data}});
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

//For Recipe page - to get single recipe card info
export const getCard = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchCard(id);
    dispatch({ type: FETCH_CARD, payload: { card:data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

//To create new comment
export const newComment = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_COMMENT_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await api.postComment(reviewData,config);
    dispatch({
      type: NEW_COMMENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    console.log(error);
  }
};

//To get recommended cards
export const getRecommendSearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_RECOMMEND_LOADING });
    const { data :{data}} = await api.getRecommendSearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, data});
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

//To create new recipe card
export const createCard = (formData) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createCard(formData);
    dispatch({ type: CREATE, data });
  } catch (error) {
    console.log(error);
  }
};