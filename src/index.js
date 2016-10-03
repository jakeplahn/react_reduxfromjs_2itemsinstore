import React from 'react';
import { render } from 'react-dom';
import './index.css';
import { Button } from 'react-bootstrap'
import { createStore } from 'redux';
import App from './App';

const DEFAULT_CATEGORY = "colors";
const INITIAL_STORE_STATE = {currentCategory: DEFAULT_CATEGORY,
                             categoryChangeCount: 0};
const CHANGE_CATEGORY = "CHANGE_CATEGORY";

const CATEGORIES = {"fruit" :
    [{id:1,name:"apples"},
    {id:2,name:"oranges"},
    {id:3,name:"bananas"},
    {id:4,name:"grapes"}],
  "colors" :
    [{id:1,name:"red"},
    {id:2,name:"green"},
    {id:3,name:"blue"},
    {id:4,name:"orange"}]};

const reducerSelectedCategory = (state=INITIAL_STORE_STATE, action) => {
  switch (action.type)
  {
    case CHANGE_CATEGORY:
        let newState = { ...state, currentCategory: action.currentCategory};
        newState = { ...newState, categoryChangeCount: state.categoryChangeCount + 1};
        return newState;
    default:
      return state;
  }
};

const appComponent = render(
  <App items={CATEGORIES[DEFAULT_CATEGORY]}/>,
  document.getElementById('listGroup')
);

let store = createStore(reducerSelectedCategory);

store.subscribe(() => {
  appComponent.setState({items: CATEGORIES[store.getState().currentCategory]});
  document.getElementById("categoryChanges").innerHTML = store.getState().categoryChangeCount;
});

const handleDisplayFruit = () => {
  store.dispatch({type: CHANGE_CATEGORY, currentCategory: 'fruit'});
};

const handleDisplayColor = () => {
  store.dispatch({type: CHANGE_CATEGORY, currentCategory: 'colors'});
};

const ButtonComponents = () => (<div><Button onClick={handleDisplayFruit}>Display fruit</Button>
  <Button onClick={handleDisplayColor}>Display color</Button></div>)
render(<ButtonComponents/>,
  document.getElementById('changeButton'));
