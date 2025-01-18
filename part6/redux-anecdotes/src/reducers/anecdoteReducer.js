/* import { createSlice, current } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const anecdote = action.payload;
      state.push({
        content: anecdote,
        id: getId(),
        votes: 0,
      });
    },
    voteAnecdote(state, action) {
      const id = action.payload;
      
      console.log('id :>> ', id);
      console.log("state => ", current(state))

      const anecdoteToVote = state.find((n) => n.id === id);
      console.log('anecdoteToVote :>> ', anecdoteToVote);
      
      //increase by 1 value of array element by id
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: ++anecdoteToVote.votes,
      };

      //return modified anecdote array order by votes
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    }
  }
})

export const { voteAnecdote, createAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer */

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_ANECDOTE":
      return [...state, action.payload];
    case "VOTE": {
      //search anecdote by id
      const id = action.payload.id;
      const anecdoteToVote = state.find((n) => n.id === id);

      //increase by 1 value of array element by id
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: ++anecdoteToVote.votes,
      };

      //return modified anecdote array
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      ).sort((a, b) => b.votes - a.votes);
    }
    default:
      return state;
  }
};

//action creators
export const voteAnecdote = (id) => {
  return {
    type: "VOTE",
    payload: { id },
  };
};

export const createAnecdote = (anecdote) => {
  return {
    type: "NEW_ANECDOTE",
    payload: {
      content: anecdote,
      id: getId(),
      votes: 0,
    },
  };
};

export default reducer;
