import React, { Component } from 'react';
import classes from './Quiz.module.sass';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import {
  fetchQuizById,
  quizAnswerClick,
  retryQuiz,
  timeUp,
} from '../../store/actions/quiz';
import QuizTimer from '../../components/QuizTimer/QuizTimer';

class Quiz extends Component {
  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id);
  }
  componentWillUnmount() {
    this.props.retryQuiz();
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Answer all questions</h1>

          {this.props.loading || !this.props.quiz ? (
            <Loader />
          ) : this.props.isFinished ? (
            <FinishedQuiz
              results={this.props.results}
              quiz={this.props.quiz}
              onRetry={this.props.retryQuiz}
            />
          ) : (
            <>
              <ActiveQuiz
                question={this.props.quiz[this.props.activeQuestion].question}
                answers={this.props.quiz[this.props.activeQuestion].answers}
                onAnswerClick={this.props.quizAnswerClick}
                quizLength={this.props.quiz.length}
                answerNumber={this.props.activeQuestion + 1}
                state={this.props.answerState}
              />
              <QuizTimer
                id={this.props.activeQuestion}
                timeUp={this.props.timeUp}
              />
            </>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    activeQuestion,
    answerState,
    isFinished,
    results,
    quiz,
    loading,
  } = state.quiz;
  return {
    activeQuestion,
    answerState,
    isFinished,
    results,
    quiz,
    loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz()),
    timeUp: answerId => dispatch(timeUp(answerId)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
