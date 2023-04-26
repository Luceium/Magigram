import { createStore } from 'redux';

const initialState = {
letterFrequency: {}
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_DATA':
      return { ...state, letterFrequency: action.payload };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
