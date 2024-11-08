import { useState } from 'react'
import PropTypes from 'prop-types';

const StatisticLine = ({text, value}) => {
  return (
    <>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
    </>
  )
}

StatisticLine.propTypes = {
  text: PropTypes.string,
  value: PropTypes.any
};

const Statistics = ({good, neutral, bad}) => {
  
  const totalComments = () => good + neutral + bad;
  const averageScore = () => ((good - bad)/ (good + neutral + bad)).toFixed(2);
  const positive = () => ((good * 100)/ (good + neutral + bad)).toFixed(2) + " %";


  if (totalComments() === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text='good' value={good}></StatisticLine>
          <StatisticLine text='neutral' value={neutral}></StatisticLine>
          <StatisticLine text='bad' value={bad}></StatisticLine>
          <StatisticLine text='total' value={totalComments()}></StatisticLine>
          <StatisticLine text='average' value={averageScore()}></StatisticLine>
          <StatisticLine text='positive' value={positive()}></StatisticLine>
        </tbody>
      </table>      
    </>
  )
  
}

Statistics.propTypes = {
  good: PropTypes.number,
  neutral: PropTypes.number,
  bad: PropTypes.number,
};

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
};

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const onClickGood = () => {
    setGood(good + 1);
  }

  const onClickNeutral = () => {
    setNeutral(neutral + 1);
  }

  const onClickBad = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={onClickGood} text='good'></Button>
      <Button onClick={onClickNeutral} text='neutral'></Button>
      <Button onClick={onClickBad} text='bad'></Button>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App