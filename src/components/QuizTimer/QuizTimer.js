import React, { Component } from 'react';
import classes from './QuizTimer.module.css';

export default class QuizTimer extends Component {
  state = {
    time: 20,
  };

  componentDidMount() {
    this.timerFunc();
  }
  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.setState({ time: 20 });
    }
    if (this.state.time === 0) {
      this.setState({ time: 20 });
      this.props.timeUp();
    }
    this.timerFunc();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  timerFunc = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(
      () =>
        this.setState(prevState => {
          return { time: prevState.time - 1 };
        }),
      1000
    );
  };

  render() {
    const { time } = this.state;
    return (
      <div className={classes.QuizTimer}>
        <span className={time <= 3 ? classes.Red : null}>{time}</span> seconds
        left
      </div>
    );
  }
}
