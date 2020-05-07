import React, {Component} from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import QuizList from './containers/QuizList/QuizList'
import Auth from './containers/Auth/Auth'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import Layout from './hoc/Layout/layout';
import Quiz from './containers/quiz/quiz'
import Logout from './components/Logout/Logout'
import {autoLogin} from './store/actions/auth';

class App extends Component {
  componentDidMount(){
    this.props.autoLogin()
  }
  // render(){
  //   let routes=(<Switch>
      
  //           <Route path='/auth' component={Auth} />
  //           <Route path='/quiz/:id' component={Quiz} />
  //           <Route path='/' exact component={QuizList} />
  //           <Redirect to='/' />
      
  //   </Switch> )
  //     if (this.props.isAuthenticated){
  //       routes=(
  //       <Switch>
  //         <Route path='/logout' component={Logout} />
  //         <Route path='/quiz-creator' component={QuizCreator} />
  //         <Route path='/quiz/:id' component={Quiz} />
          
  //         <Route path='/' exact  component={QuizList} />
         
  //         <Redirect to='/' />
  //       </Switch>)
  //     } 
  render() {

    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/" exact component={QuizList} />
        <Redirect to="/" />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={QuizList} />
          <Redirect to="/" />
        </Switch>
      )
    }
      return (
       
          <Layout>
            { routes }
           
            </Layout>
      
      )
  }
}
function mapStateToProps(state){
  console.log('TOKEN', !!state.auth.token)
  return {
    isAuthenticated:!!state.auth.token
  }
}
function mapDispatchToProps(dispatch){
  return {
      autoLogin: () => dispatch(autoLogin())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
