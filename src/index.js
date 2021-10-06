import React from "react"
import ReactDOM from "react-dom"
import Routers from './routers/index';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import store from './redux/store'
import { Provider } from 'react-redux';
ReactDOM.render(
  <DndProvider backend={HTML5Backend}>
    <Provider store={store}>
        <Routers />      
    </Provider>
  </DndProvider>, document.getElementById("root"))
