import React, { Component } from 'react'
import classes from './Auth.module.sass'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'
import Axios from 'axios';
import { loginToken, registerToken } from './API';

export default class Auth extends Component {

  state = {
    formControls: {
      email: {
        value: '',
        type: 'email',
        autocomplete: 'username',
        label: 'Email',
        errorMessage: 'Enter correct email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        }
      },
      password: {
        value: '',
        type: 'password',
        autocomplete: 'current-password',
        label: 'Password',
        errorMessage: 'Enter correct password',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        }
      },
    },
    isFormValid: false,
  }

  loginHandler = async () => {
    const authData ={
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    }
    try {
      const response = await Axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${loginToken}`, authData);
      console.log(response.data);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  registerHandler = async () => {
    const authData ={
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    }
    try {
      const response = await Axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${registerToken}`, authData);
      console.log(response.data);
      
    } catch (error) {
      console.log(error);
      
    }
  }
  submitHandler = event => {
    event.preventDefault()
  }

  validateControl(value, validation) {
    if (!value) return true;

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (validation.email) {
      isValid = is.email(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  }

  onChangeHandler = (event, controlName) => {
    const formControls = {...this.state.formControls};
    const control = {...formControls[controlName]};

    control.value = event.target.value;
    control.touched = true;
    control.valid=this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;
    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    })
    this.setState({
      formControls,
      isFormValid,
    });
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input 
          key={controlName + index}
          type={control.type}
          autocomplete={control.autocomplete}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation}
          onChange={event => this.onChangeHandler(event, controlName)}
        />
      )
    })
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Authentication</h1>
          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            {this.renderInputs()}
            
            <Button 
              type="success"
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Login
            </Button>
            <Button 
              type="primary"
              onClick={this.registerHandler}
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    )
  }
}
