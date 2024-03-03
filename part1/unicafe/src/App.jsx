import { useState } from 'react'

const Button = ({ text, onClick }) => (
  <button onClick={onClick} >{text}</button>
)

const Total = ({ text, total }) => (
  <p>{text}: {total}</p>
)

const Calculate = ({ text, total, good, bad }) => {
  if (total === 0) {
    return <p>{text}: {text === 'Average' ? 0 : `0%`}</p>
  }

  if (text === 'Average') {
    return (
      <p>{text}: {(good - bad) / total}</p>
    )
  }
  return (
    <p>{text}: {good / total}%</p>
  )
}

const App = () => {
  const [ good, setGood ] = useState(0);
  const [ neutral, setNeutral ] = useState(0);
  const [ bad, setBad ] = useState(0);
  const [ total, setTotal ] = useState(0);

  const handleGood = () => {
    setGood(prev => {
      const updatedValue = prev + 1;
      setTotal(updatedValue + neutral + bad)
      return (updatedValue)
    });
  };

  const handleNeutral = () => {
    setNeutral(prev => {
      const updatedValue = prev + 1;
      setTotal(good + updatedValue + bad)
      return (updatedValue)
    });
  };

  const handleBad = () => {
    setBad(prev => {
      const updatedValue = prev + 1;
      setTotal(good + neutral + updatedValue)
      return (updatedValue)
    });
  };

  return (
    <>
      <h2>Give Feedback</h2>
      <Button onClick={handleGood} text="Good" />
      <Button onClick={handleNeutral} text="Neutral" />
      <Button onClick={handleBad} text="Bad" />

      <h2>Statistics</h2>
      <Total text="Good" total={good} />
      <Total text="Neutral" total={neutral} />
      <Total text="Bad" total={bad} />
      <Total text="All" total={total} />
      <Calculate text='Average' total={total} good={good} bad={bad} />
      <Calculate text='Positive' total={total} good={good} bad={bad} />
    </>
  )
}

export default App
