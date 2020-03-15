import React, { Component } from 'react';
import classes from './QuizList.module.sass';
import { NavLink } from 'react-router-dom';
import { fetchQuizesStart } from '../../store/actions/quiz';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';

class QuizList extends Component {
  renderQuizes() {
    return this.props.quizes.map(quiz => {
      return (
        <li key={quiz.id}>
          <NavLink to={`/quiz/${quiz.id}`}>{quiz.name}</NavLink>
        </li>
      );
    });
  }

  componentDidMount() {
    this.props.fetchQuizesStart();
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Quiz List</h1>
          {this.props.loading && this.props.quizes.length !== 0 ? (
            <Loader />
          ) : (
            <ul>{this.renderQuizes()}</ul>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading,
  };
}
const mapDispatchToProps = {
  fetchQuizesStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
