import React, { Component } from 'react';

class AddLocationForm extends Component {
	createLocation(event) {
		event.preventDefault();
		const locationId = this.newLocation.value.replace(/ /g , '-').toLowerCase();
		const location = {
			name: this.newLocation.value,
			lastMeal: 0
		}
		this.props.addLocation(locationId, location);
	}
	render() {
		return (
			<form className="add-location" onSubmit={(e) => this.createLocation(e)}>
			  <input ref={(input) => this.newLocation = input} name="newLocation" type="text" placeholder="Location" />
			  <button type="submit">New Location</button>
			</form>
		)
	}
}

export default AddLocationForm;