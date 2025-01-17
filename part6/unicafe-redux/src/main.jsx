import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const onClickGood = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const onClickOk = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const onClickBad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const onClickReset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <button onClick={onClickGood}>good</button> 
      <button onClick={onClickOk}>ok</button> 
      <button onClick={onClickBad}>bad</button>
      <button onClick={onClickReset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
