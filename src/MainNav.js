import React, { Component } from 'react';

class MainNav extends Component {

	confirmClearData(e) {
		e.preventDefault();
		const confirmClear = confirm('This will clear all data you’ve entered. It’s really for development pruposes, but while we’re in alpha, it could be useful. Are you sure you want to clean the slate?');
		if (confirmClear === true) {
			this.props.clearAllData();
			const mainNav = document.getElementById('main-nav');
			mainNav.classList.add('left');
		}
	}

	cancelCurrentMeal(e) {
		e.preventDefault();
		const confirmClear = confirm('Are you sure you want to erase the current meal? It won’t be saved.');
		if (confirmClear === true) {
			this.props.cancelCurrentMeal();
			const mainNav = document.getElementById('main-nav');
			mainNav.classList.add('left');
		}
	}

	render() {
		return (
			<div id="main-nav" className="main-nav screen left">
				<ol className="menu-list">
					<li><a href="#" onClick={(e) => this.cancelCurrentMeal(e)}>Cancel current meal</a></li>
					<li><a href="#" onClick={(e) => this.confirmClearData(e)}>Clear all data</a></li>
				</ol>
			</div>
		)
	}
}

export default MainNav;