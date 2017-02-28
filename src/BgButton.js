import React, { Component } from 'react';

class BgButton extends Component {
	render() {
		const isActive = this.props.id === this.props.selectedOption ? 'bg-map__option active' : 'bg-map__option not-active';
		return (
			<button className={isActive} onClick={(e) => this.props.action(e, this.props.id, this.props.parameter, this.props.time)}>{this.props.id}</button>
		)
	}
}

export default BgButton;