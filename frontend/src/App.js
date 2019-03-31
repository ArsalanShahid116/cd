import React, { Component } from 'react';
import 'antd/dist/antd.css';
import BaseRouter from './routes';
import {BrowserRouter as Router} from 'react-router-dom';
import { connect } from 'react-redux';
import CustomLayout from './containers/Layout';
import * as actions from './store/actions/auth';

class App extends Component {
  componentsDidMount() {
  	this.props.onTryAutoSignup();
  }

  render() {
    return (
	    <div>
	            <Router>
	              <CustomLayout {...this.props}>
	                  <BaseRouter />
	              </CustomLayout>
	            </Router>
	    </div>
      );
    }
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.token !== null
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignUp: () => dispatch(actions.authCheckState())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
