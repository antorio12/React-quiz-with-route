<<<<<<< HEAD
import {FETCH_QUIZES_SUCCESS,
     FETCH_QUIZES_ERROR, 
    FETCH_QUIZES_START, 
    FETCH_QUIZ_SUCCESS,
    QUIZ_SET_STATE,
    FINISH_QUIZ,
    QUIZ_NEXT_QUIESTION,
    QUIZ_RETRY } from '../actions/actionTypes'

const initialState={
    quizes: [],
      loading: false,
      error: null,
      results:{},
     isFinished:false,
     activeQuestion:0,
     answerState:null,
     quiz: null
=======
import {FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR, FETCH_QUIZES_START} from '../actions/actionTypes'

const initialState={
    quizes: [],
      loading: true,
      error: null
>>>>>>> 2292d18632268ed4477212b68556a710b0676df1
}

export default function quizReducer(state=initialState, action) {
    switch (action.type){
        case FETCH_QUIZES_ERROR:
            return {
                ...state, loading:false, error: action.error
            }
            case FETCH_QUIZES_START:
            return {
                ...state, loading:true
            }
            case FETCH_QUIZES_SUCCESS:
            return {
                ...state, loading:false, quizes: action.quizes
            }
<<<<<<< HEAD
            case FETCH_QUIZ_SUCCESS:
            return {
                ...state, loading:false, quiz: action.quiz
            }
            case QUIZ_SET_STATE:
                return {
                    ...state, answerState: action.answerState, results:action.results
                }
            case FINISH_QUIZ:
                    return{
                        ...state, isFinished:true
                    }
            case QUIZ_NEXT_QUIESTION:
            return {
                ...state, answerState:null, activeQuestion:action.number
            }
            case QUIZ_RETRY:
                return {
                    ...state,
                    results:{},
                    isFinished:false,
                    activeQuestion:0,
                    answerState:null
                    


                }

=======
>>>>>>> 2292d18632268ed4477212b68556a710b0676df1
        default:
            return state
    }
}