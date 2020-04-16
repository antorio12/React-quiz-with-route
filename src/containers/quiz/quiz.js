import React, {Component} from 'react'
import Classes from './quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component{
    state={
        results:{},
        isFinished:false,
        activeQuestion:0,
        answerState:null,
        quiz:[
            
            {
                question:'Какого цвета небо?',
                rightAnswerId: 1,
                id:1,
                answers:[
                    {text: "Синий", id:1},
                    {text: "Красный", id:2},
                    {text: "Оранжевый", id:3},
                    {text: "Черный", id:4},
                ]
            },
            {
                question:'В каком году началась Вторая Мировая Война?',
                rightAnswerId: 4,
                id:2,
                answers:[
                    {text: "1918", id:1},
                    {text: "1961", id:2},
                    {text: "1941", id:3},
                    {text: "1939", id:4},
                ]
            },

        ]
    }
    onAnswerClickHandler= (answerId) =>{
        console.log('answer ID:', answerId)
        if (this.state.answerState){
            const key=Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key]==='success'){
                return
            }
        }
        const results=this.state.results
        const question= this.state.quiz[this.state.activeQuestion]
        if (question.rightAnswerId=== answerId){
           if (!results[question.id]){
               results[question.id]='success'
           }
           
            this.setState({
            answerState:{[answerId]: 'success'},
            results
            })
            const timeout= window.setTimeout( () =>{
                if (this.isFinished()){
                    this.setState({
                        isFinished:true
                    })

                } else{
                    this.setState({
                        activeQuestion: this.state.activeQuestion+1,
                        answerState:null
                    })
                
                }
             window.clearTimeout(timeout)   
            }, 1000

            )
           
        } else{
            results[question.id]= 'error'
            console.log('я ошибся')
            
            this.setState({
                answerState:{[answerId]: 'error'},
                results
        })
        console.log('xz ',this.state.answerState)
        console.log('xz2 ',this.state.results)
        }        
    }
    isFinished(){
        return this.state.activeQuestion+1 === this.state.quiz.length
    }
    onRetryHandler= () => {
        this.setState({
            results:{},
        isFinished:false,
        activeQuestion:0,
        answerState:null

        })
    }
    render(){
        return(
            <div className={Classes.Quiz}>
                
                <div className={Classes.QuizWrapper}>
                <h1>
                   На сколько ты знаешь историю
                       </h1>
                       {this.state.isFinished
                       ?<FinishedQuiz
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRerty={this.onRetryHandler}
                       >

                       </FinishedQuiz>
                       :<ActiveQuiz
                    answers={this.state.quiz[this.state.activeQuestion].answers}
                    question={this.state.quiz[this.state.activeQuestion].question}
                    onAnswerClick={this.onAnswerClickHandler}
                    quizLength={this.state.quiz.length}
                    answerNumber={this.state.activeQuestion+1}
                    state={this.state.answerState}
                    />
                       } 
                    
                </div>
            </div>

        )
    }
}
export default Quiz
