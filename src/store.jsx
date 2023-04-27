import { createStore } from 'redux';

const initialState = {
letterFrequency: {},
words: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_DATA':
      return { ...state, letterFrequency: action.payload.letterFrequency, words: action.payload.words };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
