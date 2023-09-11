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
      return { ...state, letterFrequency: action.payload.letterFrequency, words: action.payload.words };
    case 'POP': // TODO: refactor to delete
      hist.splice(action.payload, 1);
      hist = [...hist];
      return { ...state, hist: hist };
    case 'PULL':
      words = [...hist[action.payload].words];
      letterFrequency = {...hist[action.payload].letterFrequency};
      return { ...state, hist: hist, words: words, letterFrequency: letterFrequency };
    case 'PUSH':
      hist = [...state.hist];
      letterFrequency = {...state.letterFrequency};
      words = [...state.words];
      hist.push({words: words, letterFrequency: letterFrequency});
      return { ...state, hist: hist };
    case 'CLEAR':
      return { ...state, letterFrequency: {}, words: [], hist: [] };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
