import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  //const votes = Array(anecdotes.length).fill(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0)) 

  const [selected, setSelected] = useState(0)

  const [mostVoted, setMostVoted] = useState(0)

  const onClickVoteAnecdote = () => {
    const copy = [...votes]
    // increments by one with selected position
    copy[selected] += 1
    //fixin rendering
    const updatedVotes = copy;
    setVotes(updatedVotes);
    checkMostVoted(updatedVotes);
  }

  const onClickNextAnecdote = () => {
    let index = getRandomInt(0, anecdotes.length);
    setSelected(index);
  }

  function checkMostVoted(votes) {
    const max = Math.max(...votes)
    const index = votes.indexOf(max)
    setMostVoted(index)
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>Anecdote {selected}: {anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={onClickVoteAnecdote}>
        vote
      </button>
      <button onClick={onClickNextAnecdote}>
        next anecdote
      </button>
      <h1>Anecdote with most votes</h1>
      <p>Anecdote {mostVoted}: {anecdotes[mostVoted]}</p>
      <p>has {votes[mostVoted]} votes</p>
    </div>
  )
}

export default App