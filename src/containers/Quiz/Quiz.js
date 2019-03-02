import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'


class Quiz extends Component {

  state = {
    quiz: [
      {
        question: 'What is the color of sky?',
        answers: [
          {text: 'Black', id: 1},
          {text: 'Blue', id: 2},
          {text: 'Red', id: 3},
          {text: 'Green', id: 4},
        ],
        rightAnswerId: 2,
      },
    ],
  }

  onAnswerClickHandler = answerId => {
    console.log('Answer id: ', answerId);
    
  }

  render() {
    return (
      <div className={classes.Quiz}>
        
        <div className={classes.QuizWrapper}>
          <h1>Answer all questions</h1>
          <ActiveQuiz 
            question={this.state.quiz[0].question}
            answers={this.state.quiz[0].answers}
            onAnswerClick={this.onAnswerClickHandler}
          />
          
        </div>
      </div>
    )
  }
}

export default Quiz