import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'


class Quiz extends Component {

  state = {
    activeQuestion: 0,
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
        id: 1,
      },
      {
        question: 'What is the color of sea?',
        answers: [
          {text: 'Black', id: 1},
          {text: 'Blue', id: 2},
          {text: 'Red', id: 3},
          {text: 'Green', id: 4},
        ],
        rightAnswerId: 2,
        id: 2,
      },
    ],
  }

  onAnswerClickHandler = answerId => {
    console.log('Answer id: ', answerId);
    this.setState({
      activeQuestion: this.state.activeQuestion + 1,
    })
    
  }

  render() {
    return (
      <div className={classes.Quiz}>
        
        <div className={classes.QuizWrapper}>
          <h1>Answer all questions</h1>
          <ActiveQuiz 
            question={this.state.quiz[this.state.activeQuestion].question}
            answers={this.state.quiz[this.state.activeQuestion].answers}
            onAnswerClick={this.onAnswerClickHandler}
            quizLength = {this.state.quiz.length}
            answerNumber={this.state.activeQuestion + 1}
          />
          
        </div>
      </div>
    )
  }
}

export default Quiz