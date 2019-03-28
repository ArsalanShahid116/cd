import React from 'react';
import {Route, Switch} from 'react-router-dom';

import cdEditor from './components/cdEditor';
import NotFound from './components/NotFound';

const BaseRouter = () => (
	 <Switch>
	     <Route exact path="/" component={cdEditor} />
	     <Route component={NotFound} />
	 </Switch>      
);

export default BaseRouter;
