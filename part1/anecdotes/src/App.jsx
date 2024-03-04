import { useState } from 'react'

const Header = ({ content }) => (
  <h2>{content}</h2>
)

const Button = ({ text, onClick }) => (
  <button onClick={onClick} >{text.charAt(0).toUpperCase() + text.slice(1)}</button>
)

const Anecdote = ({ anecdotes }) => {
  if (!anecdotes) {
    return <p>There are no votes</p>
  }

  const { vote, anecdote } = anecdotes;

  return (
    <>
      <p>{anecdote}</p>
      <p>Has {vote > 1 ? `${vote} votes` : `${vote} vote`}</p>
    </>
)}

const App = () => {
  const [ anecdotes, setAnecdotes] = useState([
    {
      vote: 0,
      anecdote: 'If it hurts, do it more often.'
    },
    {
      vote: 0,
      anecdote: 'Adding manpower to a late software project makes it later!'
    },
    {
      vote: 0,
      anecdote: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.'
    },
    {
      vote: 0,
      anecdote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.'
    },
    {
      vote: 0,
      anecdote: 'Premature optimization is the root of all evil.'
    },
    {
      vote: 0,
      anecdote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
    },
    {
      vote: 0,
      anecdote: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
    },
    {
      vote: 0,
      anecdote: 'The only way to go fast, is to go well.'
    },
  ])
  const setRandomNum = () => Math.floor(Math.random() * 8);

  const [ selected, setSelected ] = useState(setRandomNum())
  const [ mostVoted, setMostVote ] = useState(null);

  const handleRandom = () => (
    setSelected(setRandomNum())
  )

  const handleVote = () => {
    const updateAnecdotes = [...anecdotes];
    updateAnecdotes[selected] = { ...updateAnecdotes[selected], vote: updateAnecdotes[selected].vote + 1 };
    let highestIndex = updateAnecdotes.reduce((maxIdx, currAnecdote, currIdx, array) => {
      if (currAnecdote.vote > array[maxIdx].vote) {
        return currIdx;
      } else {
        return maxIdx
      }
    }, 0);
    setAnecdotes(updateAnecdotes);
    setMostVote(highestIndex);
  }

  return (
    <div>
      <Header content="Anecdote of The Day" />
      <Anecdote anecdotes={anecdotes[selected]} />
      <section>
        <Button onClick={handleVote} text="vote" />
        <Button onClick={handleRandom} text="next anecdote" />
      </section>

      <Header content="Anecdote With Most Votes" />
      <Anecdote anecdotes={mostVoted === null ? null : anecdotes[mostVoted]} />
    </div>
  )
}

export default App
