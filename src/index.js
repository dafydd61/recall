import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import './index.css';

import App from './App';
import Setup from './Setup';
import NotFound from './NotFound';

const Root = () => {
	return (
		<Router history={browserHistory}>
	    <Route path="/" component={App}/>
	    <Route path="/setup" component={Setup}/>
	    <Route path="*" component={NotFound}/>
	  </Router>
	)
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
