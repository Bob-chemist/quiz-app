import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'


class Quiz extends Component {

  state = {
    activeQuestion: 0,
    answerState: null,
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
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === 'success') {
        return
      }
    }
    
    const question = this.state.quiz[this.state.activeQuestion];
    if (question.rightAnswerId === answerId) {
      
      this.setState({
        answerState: {[answerId]: 'success'},
      })

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          console.log('Finished');
          
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          });
           
        }
        window.clearTimeout(timeout);
      }, 1000);

      
    } else {
      this.setState({
        answerState: {[answerId]: 'error'}
      })
    }
    
    
  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
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
            state={this.state.answerState}
          />
          
        </div>
      </div>
    )
  }
}

export default Quiz