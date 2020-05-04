import axios from 'axios'
export function auth(email, password, isLogin){
    return async dispatch => {
           const authData={
          email,
          password,
          returnSecureToken:true
        }
        const url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCdc1r00Zx54kR60Ao5Yos-vLq-cUqPQjQ'
        if (isLogin){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCdc1r00Zx54kR60Ao5Yos-vLq-cUqPQjQ'
        } else{
        const response= axios.post(url, authData)
        
      }
    }
}