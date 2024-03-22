import { useState } from 'react'

const Header =({ content }) => (
  <header>
    <h2>{content}</h2>
  </header>
)

const Button = ({ text, onClick }) => (
  <button onClick={onClick}>{text.charAt(0).toUpperCase() + text.slice(1)}</button>
)

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  if (!total) {
    return (
      <p>No Feedback Given</p>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="total" value={total} />
        <StatisticLine text="average" value={(good - bad) / total} />
        <StatisticLine text="positive" value={good / total} />
      </tbody>
    </table>
  )
}

const StatisticLine  = ({ text, value }) => {
  return (
    <tr>
      <td>{text.charAt(0).toUpperCase() + text.slice(1)}: </td>
      <td>{text === "positive" ? `${Number.parseFloat(value * 100).toFixed(1)}%` : text === 'average' ? Number.parseFloat(value).toFixed(1) : value}</td>
    </tr>
  )
}

const App = () => {
  const [ feedback, setFeedback ] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  });

  const { good, neutral, bad } = feedback;

  // using 1 function to handle feedback clicks instead of declaring 3 different functions by using the bracket notation
  const handleClicks = (whichFeedback) => () => {
    setFeedback(prevFeedback => (
      { ...prevFeedback, [whichFeedback]: prevFeedback[whichFeedback] + 1 }
    ))
  }

  return (
    <>
      <Header content="Give Feedback" />
      <Button onClick={handleClicks("good")} text="good" />
      <Button onClick={handleClicks("neutral")} text="neutral" />
      <Button onClick={handleClicks("bad")} text="bad" />

      <Header content="Statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
