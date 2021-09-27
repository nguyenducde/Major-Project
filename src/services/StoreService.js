import { createStore } from "redux"

import fxData from "../reducers/fxDataReducer.jsx"

function StoreService(state, action) {}
StoreService.STORE = createStore(fxData)
export default StoreService

// import { createStore } from 'redux';

// var defaultState = {
//   todo: {
//     items: []
//   }
// };

// function todoApp(state, action) {
// }

// var store = redux.createStore(todoApp, defaultState)
