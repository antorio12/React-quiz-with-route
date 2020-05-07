import React, {Component} from 'react'
import classes from './Auth.css'
import Button from '../../components/UI/Button/button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'
import {connect} from "react-redux"
import {auth} from '../../store/actions/auth'
 class Auth extends Component {
    state = {
        isFormValid: false,
        formControls: {
          email: {
            value: '',
            type: 'email',
            label: 'Email',
            errorMessage: 'Введите корректный email',
            valid: false,
            touched: false,
            validation: {
              required: true,
              email: true
            }
          },
          password: {
            value: '',
            type: 'password',
            label: 'Пароль',
            errorMessage: 'Введите корректный пароль',
            valid: false,
            touched: false,
            validation: {
              required: true,
              minLength: 6
            }
          }
        }
      }
      loginHandler = () => {
        this.props.auth(this.state.formControls.email.value,
          this.state.formControls.password.value,
           true)
      //   const authData={
      //     email:this.state.formControls.email.value,
      //     password: this.state.formControls.password.value,
      //     returnSecureToken:true
      //   }
      //   try{
      //   const response= axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCdc1r00Zx54kR60Ao5Yos-vLq-cUqPQjQ', authData)
      //   console.log(response.data)
      // } catch(e){
      //   console.log(e)
      // }
       }
  
    registerHandler = () => {
      this.props.auth(this.state.formControls.email.value,
        this.state.formControls.password.value,
         false)
    //   const authData={
    //     email:this.state.formControls.email.value,
    //     password: this.state.formControls.password.value,
    //     returnSecureToken:true
    //   }
    //   try{
    //   const response= axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCdc1r00Zx54kR60Ao5Yos-vLq-cUqPQjQ', authData)
    //   console.log(response.data)
    // } catch(e){
    //   console.log(e)
    // }
    }
  
    submitHandler = event => {
      event.preventDefault()
    }
  
    validateControl(value, validation) {
        if (!validation) {
          return true
        }
    
        let isValid = true
    
        if (validation.required) {
          isValid = value.trim() !== '' && isValid
        }
    
        if (validation.email) {
          isValid = is.email(value) && isValid
        }
    
        if (validation.minLength) {
          isValid = value.length >= validation.minLength && isValid
        }
    
        return isValid
      }
    
    
    onChangeHandler = (event,controlName) => {
        
            
            const formControls={ ...this.state.formControls }
            const control={ ...formControls[controlName] }
            control.value=event.target.value
            control.touched=true
            control.valid=this.validateControl(control.value, control.validation)
            formControls[controlName]= control
            
            let isFormValid=true
            Object.keys(formControls).forEach(name => {
              isFormValid= formControls[name].valid && isFormValid
            })
            this.setState({
                formControls, isFormValid
            })
            
    }
    renderInputs(){
        const inputs= Object.keys(this.state.formControls).map((controlName,index) => {
            const control=this.state.formControls[controlName]     
            return (
                    <Input
                    key={controlName+index}
                    type={control.type}
                    valid={control.valid}
                    value={control.value}
                    errorMessage={control.errorMessage}
                    label={control.label}
                    touched={control.touched}
                    shouldValidate={!!control.validation}
                    onChange={event =>this.onChangeHandler(event,controlName)}
                    />
                )
        })
        return inputs
    }
    render(){
        return(
            <div className={classes.Auth}>
                <div>
                <h1>Авторизация</h1>
                <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                {this.renderInputs()}
                <Button 
                type='success'
                onClick={this.loginHandler}
                disabled={!this.state.isFormValid}>
                    Войти
                </Button>
                <Button
                    type='primary'
                    onClick={this.registerHandler}
                    disabled={!this.state.isFormValid}
                    >
                    Зарегистрироваться
                </Button>

                </form>
                </div>
            </div>
        )
}
}



function mapDispatchToProps(dispatch){
  return {
    auth: (email,password,isLogin) => dispatch(auth(email,password,isLogin))

  }
}


export default connect(null, mapDispatchToProps)(Auth)
//https://react-quiz-b8f50.firebaseio.com/