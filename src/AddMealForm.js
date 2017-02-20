import React, { Component } from 'react';
import AddLocationForm from './AddLocationForm';
import AddFoodItems from './AddFoodItems';
import MealSummary from './MealSummary';

class AddMealForm extends Component {

  constructor() {
    super();
    this.renderLocationOption = this.renderLocationOption.bind(this);
    this.createMeal = this.createMeal.bind(this);
    this.showAddLocationForm = this.showAddLocationForm.bind(this);
    this.nextScreen = this.nextScreen.bind(this);
    this.selectLocation = this.selectLocation.bind(this);
    this.addFoodItem = this.addFoodItem.bind(this);
  }

  componentWillMount() {
    this.setState({
      lastMealId: '0',
      foods: {},
    })
  }

  componentDidMount() {
    const locationSelect = document.getElementById('location');
    const selectedLocation = locationSelect.value;
    const lastMealId = this.props.locations[selectedLocation]['lastMeal'];
    this.setState({
      lastMealId: lastMealId,
      foods: {},
    });
  }

  renderLocationOption(key) {
    const id = `location-option-${key}`;
    return(<option id={id} key={key} value={key}>{this.props.locations[key]['name']}</option>);
  }

  createMeal(event) {
    event.preventDefault();
    const meal = {
      location: this.location.value,
      foods: this.state.foods,
      bgLevel: this.bgLevel.value,
      bgMotion: this.bgMotion.value,
      bolus: this.bolus.value,
      combo: this.combo.value,
      notes: this.notes.value,
    };
    this.props.addMeal(meal);
  }

  addFoodItem(index, foodItem) {
    const foods = this.state.foods;
    console.log(foods);
    foods[index] = foodItem;
    this.setState({ foods })
  }

  selectLocation() {
    const selectedLocation = this.location.value;
    const lastMealId = this.props.locations[selectedLocation]['lastMeal'];
    this.setState({
      lastMealId
    });
  }

  showAddLocationForm(event) {
    event.preventDefault();
    const locationForm = document.getElementById('add-location');
    locationForm.classList.remove('up');
  }

  nextScreen(event, screenId) {
    event.preventDefault();
    const currentScreen = document.querySelector('.current');
    currentScreen.classList.add('previous');
    currentScreen.classList.remove('current');
    const nextScreen = document.getElementById(screenId);
    // console.log(nextScreen);
    nextScreen.classList.add('current');
    nextScreen.classList.remove('next');
  }

  render() {
    return (
      <div>
        <form className="add-meal screen-container" onSubmit={this.createMeal}>
          <div id="add-meal__location" className="add-meal__location screen current">
            <div className="form-content">
              <h2>About to eat? Tell me where...</h2>
              <div className="form-controls--inline">
                <select id="location" name="location" ref={(input) => this.location = input} onChange={this.selectLocation}>
                  {Object.keys(this.props.locations).map(this.renderLocationOption)};
                </select>
                <button className="btn btn--add" onClick={(e) => this.showAddLocationForm(e) }>+</button>
              </div>
              <MealSummary
                mealId={this.state.lastMealId}
                meals={this.props.meals}
              />
            </div>
            <div className="form-nav">
              <button onClick={(e) => this.nextScreen(e, 'add-meal__food') }>Next</button>
            </div>
          </div>
          <div id="add-meal__food" className="add-meal__food screen next">
            <div className="form-content">
              <AddFoodItems
                foods={this.state.foods}
                addFoodItem={this.addFoodItem}
              />
            </div>
            <div className="form-nav">
              <button onClick={(e) => this.nextScreen(e, 'add-meal__bg') }>Next</button>
            </div>
          </div>
          <div id="add-meal__bg" className="add-meal__bg screen next">
            <div className="form-content">
              <input ref={(input) => this.bgLevel = input} type="text" name="bgLevel" placeholder="Bglevel" />
              <input ref={(input) => this.bgMotion = input} type="text" name="bgMotion" placeholder="Bgmotion" />
            </div>
            <div className="form-nav">
              <button onClick={(e) => this.nextScreen(e, 'add-meal__bolus') }>Next</button>
            </div>
          </div>
          <div id="add-meal__bolus" className="add-meal__bolus screen next">
            <div className="form-content">
              <input ref={(input) => this.bolus = input} type="text" name="bolus" placeholder="Bolus" />
              <input ref={(input) => this.combo = input} type="text" name="combo" placeholder="Combo" />
              <input ref={(input) => this.notes = input} type="text" name="notes" placeholder="Notes" />
            </div>
            <div className="form-nav">
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
        <AddLocationForm addLocation={this.props.addLocation} />
      </div>
    )
  }
}

export default AddMealForm;
