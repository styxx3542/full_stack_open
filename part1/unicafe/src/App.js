import { useState } from 'react'

const Statistics = (props) => {
  const all = props.good + props.bad + props.neutral
  if (all === 0)return(
    "No Statistics Given"
  )
  return(
    <table>
    <StatisticLine text = "good" value = {props.good}/>
    <StatisticLine text = "neutral" value = {props.neutral}/>
    <StatisticLine text = "bad" value = {props.bad}/>
    <StatisticLine text = "all" value = {all}/>
    <StatisticLine text = "average" value = {(props.good - props.bad)/all}/>
    <tr>
      <td>positive</td>
      <td>{props.good*100/all} %</td>
    </tr>
    </table>
  )
}
const Button = ({ text,fn }) => {
  return(
    <button onClick = {fn}>{text}</button>
  )
}

const StatisticLine = ({ text,value }) => {
  return(
    <tr>
    <td>{text}</td>
    <td>{value}</td>
    </tr>
  )
}

const App = () => {
  const [ good,setGood ] = useState(0)
  const [ neutral,setNeutral ] = useState(0)
  const [ bad,setBad] = useState(0)
  const all = good+neutral+bad
  return(
    <>
    <h1>Give FeedBack</h1>
    <Button fn = {() => setGood(good+1)} text = "good"/>
    <Button fn = {() => setNeutral(neutral+1)} text = "neutral"/>
    <Button fn = {() => setBad(bad+1)} text = "bad"/>
    <h1>
      statistics
    </h1>
    <Statistics good = {good} bad = {bad} neutral = {neutral}/>
    </>
  )
}

export default App;
