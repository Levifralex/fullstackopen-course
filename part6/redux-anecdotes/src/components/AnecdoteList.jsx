import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import PropTypes from "prop-types";
import { setNotification, clearNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  );
};

Anecdote.propTypes = {
  anecdote: PropTypes.object,
  handleVote: PropTypes.func,
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) =>
    state.anecdotes.filter((element) =>
      element.content
        .toString()
        .toLowerCase()
        .includes(state.filter.toString().toLowerCase())
    )
  );

  function vote(anecdote) {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification(`You voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 1000);
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => vote(anecdote) }
        />
      ))}
    </div>
  );
};

export default AnecdoteList;
