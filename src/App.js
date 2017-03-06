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
    this.cancelCurrentMeal = this.cancelCurrentMeal.bind(this);
    this.setInitialState = this.setInitialState.bind(this);
    this.createMeal = this.createMeal.bind(this);
    this.selectLocation = this.selectLocation.bind(this);
    this.setCurrentMeal = this.setCurrentMeal.bind(this);
    this.addFoodItem = this.addFoodItem.bind(this);
    this.removeFoodItem = this.removeFoodItem.bind(this);
    this.setViewportPosition = this.setViewportPosition.bind(this);
    this.updateBg = this.updateBg.bind(this);
    this.updateBolus = this.updateBolus.bind(this);
    this.bgLevels = ['above target', 'in range', 'low'];
    this.bgTrends = ['climbing', 'steady', 'falling'];
    this.updateNotes = this.updateNotes.bind(this);
  }

  addFoodItem(id, foodItem) {
    const currentMeal = this.state.currentMeal;
    currentMeal.foods[id] = foodItem;
    this.setState({ currentMeal })
    localStorage.setItem('currentMeal', JSON.stringify(currentMeal));
  }

  removeFoodItem(index) {
    const currentMeal = this.state.currentMeal;
    delete currentMeal.foods[index];
    this.setState({ currentMeal })
    localStorage.setItem('currentMeal', JSON.stringify(currentMeal));
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

  cancelCurrentMeal() {
    localStorage.removeItem('currentMeal');
    this.setState({
      mealFormScreen: 0
    });
    localStorage.setItem('mealFormScreen', 0);
    this.setInitialState();
    this.context.router.push('/');
  }

  createMeal(newLocation, templateMealId) {
    const id = Date.now();
    const templateMeal = this.state.meals[templateMealId] || {};
    const location = templateMeal.location || newLocation;
    const foods = templateMeal.foods || {};
    const newMeal = {
      id: id,
      properties: {
        location: location,
        foods: foods,
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
    return newMeal;
  }

  setCurrentMeal(id, properties) {
    const currentMeal = properties;
    currentMeal['id'] = id;
    this.setState ({ currentMeal });
    localStorage.setItem('currentMeal', JSON.stringify(currentMeal));
  }

  // createCurrentMeal() {
  //   this.setState({
  //     currentMeal: {
  //       lastMealId: '0',
  //       currentMeal: {
  //         id: '0',
  //         location: '',
  //         foods: {},
  //         bolus: '',
  //         combo: '',
  //         notes: '',
  //         bgLevel: {
  //           pre: '',
  //           post2: '',
  //           post4: '',
  //         },
  //         bgTrend: {
  //           pre: '',
  //           post2: '',
  //           post4: '',
  //         }
  //       }
  //     }
  //   });
  // }

  setViewportPosition(position) {
    this.setState({
      mealFormScreen: position,
    })
    localStorage.setItem('mealFormScreen', position);
  }

  setInitialState() {
    const locations = {
      home: {
        name: 'Home',
        lastMeal: '0',
      }
    }
    const meals = {}
    const id = Date.now();
    const currentMeal = {
      id: id,
      location: 'home',
      foods: {},
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
    };
    this.setState({
      locations: locations,
      meals: meals,
      modalIsOpen: false,
      mealFormScreen: 0,
      currentLocation: 'home',
      currentMeal: currentMeal,
    });
    const locationsRef = localStorage.getItem('locations');
    if (locationsRef) {
      this.setState({
        locations: JSON.parse(locationsRef)
      });
    } else {
      localStorage.setItem('locations', JSON.stringify(locations));
    }

    const mealsRef = localStorage.getItem('meals');
    if (mealsRef) {
      this.setState({
        meals: JSON.parse(mealsRef)
      });
    } else {
      localStorage.setItem('meals', JSON.stringify(meals));
    }

    const mealFormScreenRef = parseInt(localStorage.getItem('mealFormScreen'),10);
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

    const currentMealRef = localStorage.getItem('currentMeal');
    if (currentMealRef) {
      this.setState({
        currentMeal: JSON.parse(currentMealRef)
      });
    }

    const isSetupComplete = localStorage.getItem('is-setup-complete');
    if (!isSetupComplete) {
      this.context.router.push('/setup');
    }
  }

  componentWillMount() {
    this.setInitialState();
  }

  addLocation(locationId, location) {
    const locations = {...this.state.locations};
    locations[locationId] = location;
    console.log(locations);
    this.setState({ locations });
    localStorage.setItem('locations', JSON.stringify(locations));
  }

  selectLocation(e) {
    const selectedLocation = e.target.value;
    const currentMeal = {...this.state.currentMeal};
    currentMeal.location = selectedLocation;
    this.setState({
      currentMeal: currentMeal,
      currentLocation: selectedLocation,
    });
    localStorage.setItem('currentMeal', JSON.stringify(currentMeal));
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

  updateBg(e, newData, parameter, time) {
    e.preventDefault();
    const paramToEdit = this.state.currentMeal[parameter];
    paramToEdit[time] = newData;
    const currentMeal = this.state.currentMeal;
    currentMeal[parameter][time] = newData;
    this.setState({
      currentMeal
    });
    localStorage.setItem('currentMeal', JSON.stringify(currentMeal));
  }

  updateBolus(e) {
    const value = e.target.value;
    const currentMeal = {...this.state.currentMeal};
    currentMeal[e.target.name] = value;
    this.setState({ currentMeal })
    localStorage.setItem('currentMeal', JSON.stringify(currentMeal));
  }

  updateNotes(newNotes) {
    const currentMeal = this.state.currentMeal;
    currentMeal.notes = newNotes;
    this.setState({
      currentMeal
    });
    localStorage.setItem('currentMeal', JSON.stringify(currentMeal));
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
            currentMeal={this.state.currentMeal}
            bgLevels={this.bgLevels}
            bgTrends={this.bgTrends}
            viewportPosition={this.state.mealFormScreen}
            setViewportPosition={this.setViewportPosition}
            createMeal={this.createMeal}
            setCurrentMeal={this.setCurrentMeal}
            addFoodItem={this.addFoodItem}
            removeFoodItem={this.removeFoodItem}
            updateBg={this.updateBg}
            updateBolus={this.updateBolus}
            updateNotes={this.updateNotes}
            currentLocation={this.state.currentLocation}
            selectLocation={this.selectLocation}
          />
          <MainNav
            clearAllData={this.clearAllData}
            cancelCurrentMeal={this.cancelCurrentMeal}
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
