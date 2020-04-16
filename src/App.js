import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom'
import QuizList from './containers/QuizList/QuizList'
import Auth from './containers/Auth/Auth'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import Layout from './hoc/Layout/layout';
import Quiz from './containers/quiz/quiz'

class App extends Component {
  render(){
      return (
       
          <Layout>
            <Switch>
              <Route path='/auth' component={Auth} />
              <Route path='/quiz-creator' component={QuizCreator} />
              <Route path='/quiz/:id' component={Quiz} />
              <Route path='/' component={QuizList} />


            </Switch>
            </Layout>
      
      )
  }
}

export default App;
