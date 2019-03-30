import React from 'react';
import {Route, Switch} from 'react-router-dom';

import cdEditor from './components/cdEditor';
import NotFound from './components/NotFound';
import Login from './containers/Login';
import Signup from './containers/Signup';

const BaseRouter = () => (
	 <Switch>
	     <Route exact path="/" component={cdEditor} />
	     <Route exact path="/login" component={Login} />
	      <Route exact path="/signup" component={Signup} />
	     <Route component={NotFound} />
	 </Switch>      
);

export default BaseRouter;
