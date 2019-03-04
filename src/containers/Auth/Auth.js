import React, { Component } from 'react'
import classes from './Auth.module.sass'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'

export default class Auth extends Component {

  loginHandler = () => {

  }

  registerHandler = () => {

  }
  submitHandler = event => {
    event.preventDefault()
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Authentication</h1>
          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            <Input 
              label="Email"
              type="text"
            />
            <Input 
              label="Password"
              type="password"
              errorMessage={'yyy'}

            />
            <Button 
              type="success"
              onClick={this.loginHandler}
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
