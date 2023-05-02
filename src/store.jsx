import { createStore } from 'redux';

const initialState = {
letterFrequency: {},
words: [],
hist: []
};

function reducer(state = initialState, action) {
  let hist = state.hist;
  let words = state.words;
  let letterFrequency = state.letterFrequency;

  switch (action.type) {
    case 'UPDATE_DATA':
      console.log(action.payload)
      return { ...state, letterFrequency: action.payload.letterFrequency, words: action.payload.words };
    case 'POP':
      console.log(hist, action.payload)
      words = hist[action.payload].words;
      letterFrequency = hist[action.payload].letterFrequency;
      hist.splice(action.payload, 1);
      hist = [...hist];
      console.log(hist, words, letterFrequency)
      return { ...state, hist: hist, words: words, letterFrequency: letterFrequency };
    case 'PUSH':
      hist = [...state.hist];
      letterFrequency = {...state.letterFrequency};
      hist.push({words: state.words, letterFrequency: letterFrequency});
      return { ...state, hist: hist };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
