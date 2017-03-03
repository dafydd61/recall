import React, { Component } from 'react';
import Modal from 'react-modal';
import AddMealForm from './AddMealForm';
import Header from './Header';
import MainNav from './MainNav';
require('typeface-overpass');

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.addLocation = this.addLocation.bind(this);
    this.addMeal = this.addMeal.bind(this);
    this.clearAllData = this.clearAllData.bind(this);
    this.bgLevels = ['above target', 'in range', 'low'];
    this.bgTrends = ['climbing', 'steady', 'falling'];
  }

  clearAllData() {
    localStorage.removeItem('locations');
    localStorage.removeItem('currentMeal');
    // localStorage.removeItem('is-notification-allowed');
    // localStorage.removeItem('is-setup-complete');
    localStorage.removeItem('meals');
    this.context.router.push('/');
  }

  componentWillMount() {
    this.setState({
      modalIsOpen: false,
    });
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
        const meals = {
          currentMeal: '0'
        };
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
    console.log(meal);
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
    this.context.router.push('/');
  }

  render() {
    return (
      <div className="App wrap">
        <Header />
        <div className="content">
          <AddMealForm
            addMeal={this.addMeal}
            addLocation={this.addLocation}
            locations={this.state.locations}
            meals={this.state.meals}
            bgLevels={this.bgLevels}
            bgTrends={this.bgTrends}
          />
          <MainNav
            clearAllData={this.clearAllData}
          />
          <Modal
            isOpen={this.state.modalIsOpen}
            contentLabel='Modal'
            className='Modal'
            overlayClassName="Modal__overlay"
          >
            <h1>Modal!</h1>
            <p>Here’s your modal.</p>
          </Modal>
        </div>
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object
}

export default App;
