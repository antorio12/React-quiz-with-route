import React, {Component} from 'react'
import classes from './layout.css'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'
import {connect} from 'react-redux'

class Layout extends Component {
  state={
    menu:false
  }
  onToggleHandler= () =>{
    this.setState({
      menu: !this.state.menu
    })
  }
  menuCloseHandler= () =>{
    this.setState({
      menu: false
    })
  }
  render() {
    return (
      <div className={classes.layout}>
        <Drawer
        isOpen={this.state.menu}
        onClose={this.menuCloseHandler}
        isAuthenticated={this.props.isAuthenticated}
        />
        <MenuToggle
            isOpen={this.state.menu}
            onToggle={this.onToggleHandler}

        />
        <main>
          { this.props.children }
        </main>
      </div>
    )
  }
}
function mapStateToProps(state){
  return {
    isAuthenticated:!!state.auth.token
  }
}
export default connect(mapStateToProps)(Layout)