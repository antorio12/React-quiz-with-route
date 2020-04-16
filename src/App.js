import React, {Component} from 'react';


import Layout from './hoc/Layout/layout';
import Quiz from './containers/quiz/quiz'

class App extends Component {
  render(){
      return (
       
          <Layout>
          <Quiz />
            </Layout>
      
      )
  }
}

export default App;
