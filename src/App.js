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
    // this.setupNewMeal = this.setupNewMeal.bind(this);
    this.setViewportPosition = this.setViewportPosition.bind(this);
    this.bgLevels = ['above target', 'in range', 'low'];
    this.bgTrends = ['climbing', 'steady', 'falling'];
  }

  clearAllData() {
    localStorage.removeItem('locations');
    localStorage.removeItem('currentMeal');
    localStorage.removeItem('is-notification-allowed');
    localStorage.removeItem('is-setup-complete');
    localStorage.removeItem('meals');
    localStorage.removeItem('mealFormScreen');
    this.setInitialState();
    this.context.router.push('/');
  }

  createCurrentMeal() {
    this.setState({
      currentMeal: {
        lastMealId: '0',
        currentMeal: {
          id: '0',
          location: '',
          foods: [],
          bolus: '',
          combo: '',
          notes: '',
          bgLevel: {
            pre: '',
            post2: '',
            post4: '',
          },
          bgTrend: {
            pre: '',
            post2: '',
            post4: '',
          }
        }
      }
    });
  }

  setInitialState() {
    const locations = {
      home: {
        name: 'Home',
        lastMeal: '0',
      }
    }
    const meals = {}
    this.setState({
      locations: locations,
      meals: meals,
      modalIsOpen: false,
      mealFormScreen: 0,
    });
  }

  setViewportPosition(position) {
    this.setState({
      mealFormScreen: position,
    })
    localStorage.setItem('mealFormScreen', position);
  }

  componentWillMount() {
    this.setInitialState();
    const isSetupComplete = localStorage.getItem('is-setup-complete');
    if (!isSetupComplete) {
      this.context.router.push('/setup');
    } else {
      const locationsRef = localStorage.getItem('locations');
      if (locationsRef) {
        this.setState({
          locations: JSON.parse(locationsRef)
        });
      }

      const mealsRef = localStorage.getItem('meals');
      if (mealsRef) {
        this.setState({
          meals: JSON.parse(mealsRef)
        });
      }

      const mealFormScreenRef = parseInt(localStorage.getItem('mealFormScreen'), 10);
      if (mealFormScreenRef) {
        this.setState({
          mealFormScreen: mealFormScreenRef
        });
      } else {
        this.setState({
          mealFormScreen: 0
        });
        localStorage.setItem('mealFormScreen', 0);
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
            viewportPosition={this.state.mealFormScreen}
            setViewportPosition={this.setViewportPosition}
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
