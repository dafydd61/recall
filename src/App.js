import React, { Component } from 'react';
import AddMealForm from './AddMealForm';
require('typeface-overpass');

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.addLocation = this.addLocation.bind(this);
    this.addMeal = this.addMeal.bind(this);
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
        const locations = {
          home: {
            name: 'Home',
            lastMeal: '0'
          }
        };
        this.setState({ locations });
        localStorage.setItem('locations', JSON.stringify(locations));
      }

      const mealsRef = localStorage.getItem('meals');
      if (mealsRef) {
        this.setState({
          meals: JSON.parse(mealsRef)
        });
      } else {
        const meals = {};
        this.setState({ meals: meals });
        localStorage.setItem('meals', JSON.stringify(meals));
      }
    }
  }

  addLocation(locationId, location) {
    const locations = {...this.state.locations};
    locations[locationId] = location;
    console.log(locations);
    this.setState({ locations });
    localStorage.setItem('locations', JSON.stringify(locations));
  }

  addMeal(meal) {
    const id = Date.now();
    const meals = {...this.state.meals};
    meals[id] = meal;
    const locations = {...this.state.locations};
    locations[meal.location]['lastMeal'] = id;
    this.setState({
      meals: meals,
      locations: locations
     });
    localStorage.setItem('meals', JSON.stringify(meals));
    localStorage.setItem('locations', JSON.stringify(locations));
  }

  render() {
    return (
      <div className="App wrap">
        <div className="header">
          <h1>Recall</h1>
        </div>
        <div className="content">
          <AddMealForm
            addMeal={this.addMeal}
            addLocation={this.addLocation}
            locations={this.state.locations}
            meals={this.state.meals}
          />
        </div>
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object
}

export default App;
