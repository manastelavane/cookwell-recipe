import { combineReducers } from 'redux';

import auth from './auth';
import {cards} from './cards';
// import {newCommentReducer} from './cards';

export const reducers = combineReducers({ auth,cards });
