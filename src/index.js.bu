import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';
import App from './App';
import Setup from './Setup';
import NotFound from './NotFound';
import './index.css';

const isSetupComplete = localStorage.getItem('is-setup-complete');

const Root = () => {
	return (
		<BrowserRouter>
			<div>
				<Match exactly pattern="/" component={App} />
				<Miss component={NotFound} />
			</div>
		</BrowserRouter>
	)
}

if (isSetupComplete) {
	ReactDOM.render(
	  <Root />,
	  document.getElementById('root')
	);
} else {
	ReactDOM.render(
	  <Setup />,
	  document.getElementById('root')
	);
}
