import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.addLocation = this.addLocation.bind(this);
    this.addMeal = this.addMeal.bind(this);
    this.renderLocationOption = this.renderLocationOption.bind(this);
  }
  componentWillMount() {
    const isSetupComplete = localStorage.getItem('is-setup-complete');
    if (!isSetupComplete) {
      this.context.router.push('/setup');
    } else {
      const locationsRef = localStorage.getItem('locations');
      if (locationsRef) {
        this.setState({
          locations: JSON.parse(locationsRef)
        });
      } else {
        this.setState({
          locations: {}
        });
      }
    }
  }

  addLocation(event) {
    event.preventDefault();
    const location = this.location.value;
    const locations = {...this.state.locations};
    const index = Date.now();
    locations[index] = location;
    const keys = Object.keys(locations);
    console.log(keys);
    const keysSorted = keys.sort((a, b) => a < b ? 1 : -1);
    console.log(keysSorted);

    // const locationsArray = Array.from(locations);
    // const locationsSorted = locationsArray.sort((a, b) => a.key < b.key ? 1 : -1);
    // console.log(locationsSorted);
    // this.setState({ locations });
    // localStorage.setItem('locations', JSON.stringify(locations));
    // const newLocationId = `location-option-${index}`;
    // const newLocation = document.getElementById(newLocationId);
    // console.log(newLocationId);
  }

  addMeal() {

  }

  renderLocationOption(key) {
    const id = `location-option-${key}`;
    return(<option id={id} key={key} value={key}>{this.state.locations[key]}</option>);
  }

  render() {
    return (
      <div className="App">
        <h2>Recall</h2>
        <form className="add-location" onSubmit={this.addLocation}>
          <input ref={(input) => this.location = input} type="text" placeholder="Location" />
          <button type="submit">New Location</button>
        </form>
        <form className="add-meal" onSubmit={this.addMeal}>
          <select name="location">
            {Object.keys(this.state.locations).map(this.renderLocationOption)};
          </select>
          <input type="text" name="food" placeholder="Food" />
          <input type="text" name="bgLevel" placeholder="Bglevel" />
          <input type="text" name="bgMotion" placeholder="Bgmotion" />
          <input type="text" name="bolus" placeholder="Bolus" />
          <input type="text" name="combo" placeholder="Combo" />
          <input type="text" name="notes" placeholder="Notes" />
        </form>
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object
}

export default App;
