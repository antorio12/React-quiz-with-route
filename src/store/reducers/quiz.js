import {FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR, FETCH_QUIZES_START} from '../actions/actionTypes'

const initialState={
    quizes: [],
      loading: true,
      error: null
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
        default:
            return state
    }
}