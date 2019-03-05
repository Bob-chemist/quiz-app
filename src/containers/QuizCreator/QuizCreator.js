import React, { Component } from 'react'
import classes from './QuizCreator.module.sass'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'
import {createControl} from '../../form/formFramework'
// import Auxiliary from '../../hoc/Auxiliary/Auxiliary'

function createOptionControl(number) {
  return createControl({   
    label: `Enter option ${number}`,
    errorMessage: 'The option cannot be empty',
    id: number,
    }, {required: true});  
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Enter new question',
      errorMessage: 'The question cannot be empty',
    }, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

export default class QuizCreator extends Component {

  state = {
    quiz: [],
    formControls: createFormControls(),
    rightAnswerId: 1,
  }

  submitHandler = event => {
    event.preventDefault();
  }

  addQuestionHandler = () => {

  }

  createQuizHandler = () => {

  }

  changeHandler = (value, controlName) => {

  }

  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];

      return (
        <React.Fragment key={controlName + index}>
          <Input             
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={event => this.changeHandler(event.target.value, controlName)}        
          />
          {index === 0 ? <hr/> : null }
        </React.Fragment>
      )
    })
  }

  selectChangeHandler = event => {
    this.setState({
      rightAnswerId: +event.target.value,
    })
  }

  render() {
    const select = <Select 
      label='Choose right answer'
      value={this.state.rightAnswerId}
      onChange={this.selectChangeHandler}
      options={[
        {text: 1, value: 1},
        {text: 2, value: 2},
        {text: 3, value: 3},
        {text: 4, value: 4},
      ]}
    />

    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Quiz Creator</h1>
          <form onSubmit={this.submitHandler}>
            
            { this.renderControls() }

            {select}

            <Button
              type='primary'
              onClick={this.addQuestionHandler}
            >Add question</Button>
            <Button
              type='success'
              onClick={this.createQuizHandler}
            >Create quiz</Button>
          </form>
        </div>
        
        
      </div>
    )
  }
}
