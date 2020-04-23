import React, {Component} from 'react'
import classes from './QuizCreator.css'
import Button from '../../components/UI/Button/button'
import {createControl, validate, validateForm} from '../../form/formFramework'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'
import axios from 'axios'
//import Auxiliary from '../../components/UI/Auxiliary/Auxiliary'

function createOptionControl(number){
    return createControl({  
        label: `Вариант ${number}`,
        errorMessage:"Значение не может быть пустым",
        id:number
        }, {required:true})
}
function createFormControls(){
    return {
        question:createControl({  
        label: 'Введите вопрос',
        errorMessage:"Значение не может быть пустым"
        }, {required:true}),
        option1:createOptionControl(1),
        option2:createOptionControl(2),
        option3:createOptionControl(3),
        option4:createOptionControl(4)
    }
}
export default class QuizCreator extends Component {
    state= {
        quiz:[],
        isFormValid:false,
        rightAnswerId: 1,
        formControls: createFormControls()
    }
    submitHandler= event =>{
        event.preventDefault()
    }
    addQuestionHandler= (event) =>{
        event.preventDefault()
        const quiz=this.state.quiz.concat()
        const index= quiz.length+1

        const {question, option1, option2, option3, option4}= this.state.formControls

        const questionItem={
            question:question.value,
            id:index,
            rightAnswerId: this.state.rightAnswerId,
            answer:[
                {text: option1.value, id:option1.id},
                {text: option2.value, id:option2.id},
                {text: option3.value, id:option3.id},
                {text: option4.value, id:option4.id}
            ]
        }
        quiz.push(questionItem)
        this.setState({
            quiz,
            isFormValid:false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })
    }
    createQuizHandler= (event) =>{
        event.preventDefault()
        
        axios.post( 'https://react-quiz-b8f50.firebaseio.com/quizes.json', this.state.quiz)
            .then (response =>{
                console.log(response)
            })
            .catch(error => {console.log(error)})
    }
    changeHandler= (value, controlName) =>{
        const formControls={ ...this.state.formControls }
        const control={ ...formControls[controlName] }
        control.touched=true
        control.value= value
        control.valid=validate(control.value, control.validation)
        formControls[controlName]= control
         this.setState({
             formControls,
             isFormValid: validateForm(formControls)
         })
    }
    renderInputs=() =>{
        return Object.keys(this.state.formControls).map((controlName, index) => {
         const control=this.state.formControls[controlName]
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
             { index ===0? <hr/>: null}
             </React.Fragment>
         )
        }
       
        )

    }
    selectChangeHandler= event =>{
        this.setState({
            rightAnswerId: +event.target.value
        }) 
    }
    render(){
        const select=<Select
                    label='Введите правильный ответ'
                    onChange={this.selectChangeHandler}
                    value={this.state.rightAnswerId}
                    options={
                        [
                            {text:1, value:1},
                            {text:2, value:2},
                            {text:3, value:3},
                            {text:4, value:4}
                        ]
                    }
        />
        return(
            <div className={classes.QuizCreator}>
            <div>
                <h1>QuizCreator</h1>
                <form onSubmit={this.submitHandler}>
                    {this.renderInputs()}
                    {/* <input type='text'></input>
                    <hr/>
                    <input type='text'></input>
                    <input type='text'></input>
                    <input type='text'></input>
                    <input type='text'></input> */}
                    {select}

                    
                    <Button
                    onClick={this.addQuestionHandler}
                    type='primary'
                    disabled={!this.state.isFormValid}
                    >
                        Добавить вопрос
                    </Button>
                    <Button
                    onClick={this.createQuizHandler}
                    type='success'
                    disabled={this.state.quiz.length===0}
                    >
                        Создать тест
                    </Button>
                </form>
            </div>
            </div>
)
}
}