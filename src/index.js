import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import axios from 'axios'
import {takeEvery, put} from 'redux-saga/effects'


// this startingPlantArray should eventually be removed
// const startingPlantArray = [
//   { id: 1, name: 'Rose' },
//   { id: 2, name: 'Tulip' },
//   { id: 3, name: 'Oak' }
// ];

// create reducers 
const plantList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PLANT':
      return action.payload
    default:
      return state;
  }
};

// create generators 
function* getPlantList() {
  try {
    const plants = yield axios.get('api/plant')
    yield put({type: 'ADD_PLANT', payload: plants.data })
  } catch (error){
    console.log (`error in GET ${error}`)
  }
}

// create saga store
function* rootSaga() {
  yield takeEvery('FETCH_PLANTS', getPlantList)
}

//set up saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({ plantList, }),
  //and saga middleware to store
applyMiddleware(sagaMiddleware, logger),
);
  //start saga middleware
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);