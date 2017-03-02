import React, { Component } from 'react';

class Header extends Component {

	constructor() {
		super();
		this.toggleNav = this.toggleNav.bind(this);

	}

	toggleNav(e, barClicked) {
		e.preventDefault();
		const navButton = e.currentTarget;
		navButton.classList.toggle('open');
		const mainNav = document.getElementById('main-nav');
		mainNav.classList.toggle('left');
	}

	render() {
		// const foodIds = Object.keys(this.props.foods);
		return (
			<div className="Header">
				<button className="revealNav" onClick={(e) => this.toggleNav(e)}>
					<div className="hamburger-bar"></div>
					<div className="hamburger-bar"></div>
					<div className="hamburger-bar"></div>
				</button>
			  <h1>Recall</h1>
			</div>
		)
	}
}

export default Header;