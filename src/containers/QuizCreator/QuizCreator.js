import React, {Component} from 'react'
import classes from './QuizCreator.css'
import Button from '../../components/UI/Button/button'
import {createControl} from '../../form/formFramework'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'
//import Auxiliary from '../../components/UI/Auxiliary/Auxiliary'

function createOptionControl(number){
    return createControl({  
        label: `Вариант ${number}`,
        errorMessage:"Значение не может быть пустым"
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
        rightAnswerId: 1,
        formControls: createFormControls()
    }
    submitHandler= event =>{
        event.preventDefault()
    }
    addQuestionHandler= () =>{

    }
    createQuizHandler= () =>{

    }
    changeHandler= (value, controlName) =>{

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
            rightAnswerId: event.target.value
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
                    >
                        Добавить вопрос
                    </Button>
                    <Button
                    onClick={this.createQuizHandler}
                    type='success'
                    >
                        Создать тест
                    </Button>
                </form>
            </div>
            </div>
)
}
}