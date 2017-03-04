import React, { Component } from 'react';

class AddLocationForm extends Component {
	createLocation(event) {
		event.preventDefault();
		const locationId = this.newLocation.value.replace(/ /g , '-').toLowerCase();
		const location = {
			name: this.newLocation.value,
			lastMeal: "0"
		}
		this.props.addLocation(locationId, location);
		const locationForm = document.getElementById('add-location');
		locationForm.classList.add('up');
	}
	cancel(event) {
		event.preventDefault();
		const locationForm = document.getElementById('add-location');
		locationForm.classList.add('up');
	}
	render() {
		return (
			<form id="add-location" className="add-location drop-in up" onSubmit={(e) => this.createLocation(e)}>
			  <input ref={(input) => this.newLocation = input} name="newLocation" type="text" placeholder="Location" />
			  <button type="submit">Add</button><button onClick={(e) => this.cancel(e)}>Cancel</button>
			</form>
		)
	}
}

export default AddLocationForm;