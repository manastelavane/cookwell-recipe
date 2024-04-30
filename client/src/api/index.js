import axios from 'axios';

const API = axios.create({ baseURL: 'https://recipenewserver1.onrender.com' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

//recipes related api calls
export const fetchCards = (category,page) => API.get(`/card?category=${category}&page=${page}`);
export const fetchNewCards = (page) => API.get(`/card/new?page=${page}`);
export const fetchRelatedCards = (query) => API.get(`/card/related?query=${query}`);
export const fetchCard = (id) => API.get(`/card/${id}`);
export const postComment = (reviewData,config) => API.put(`/card/review`,reviewData,config);
export const getRecommendSearch = (searchQuery) => API.get(`/card/recomendsearch?Keywords=${searchQuery.Keywords}&category=${searchQuery.category}`);
export const createCard = (formData) => API.post('/card/createcard', formData);

//user related api calls
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const googleSignUp = (formData) => API.post('/user/googleSignUp', formData);
export const updateProfile = (profiledata,config) => API.put(`/user/update`,profiledata,config);
