import React, { Component } from 'react';
import classes from './QuizList.module.sass';
import { NavLink } from 'react-router-dom';
import { fetchList } from '../../store/sagas/quizSagas';
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
    this.props.fetchList();
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Quiz List</h1>
          {this.props.loading || !this.props.quizes.length ? (
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
  fetchList,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
