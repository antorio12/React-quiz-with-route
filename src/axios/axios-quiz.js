import axios from 'axios'

export default axios.create({
    baseURL:'https://react-quiz-b8f50.firebaseio.com'
}) //connect to our Firebase