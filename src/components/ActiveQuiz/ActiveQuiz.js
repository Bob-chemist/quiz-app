import React from 'react'
import classes from './ActiveQuiz.module.css'
import AnswersList from './AnswersList/AnswersList'

const ActiveQuiz = props => (
  <div className={classes.ActiveQuiz}>
    <p className={classes.Question}>
      <span>
        <strong>2. </strong>
        How are you?
      </span>
      <small>4 of 12</small>
    </p>
    <AnswersList 
      answers={props.answers}
    />
  </div>
)

export default ActiveQuiz