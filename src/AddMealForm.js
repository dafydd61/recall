import React, { Component } from 'react';
import AddLocationForm from './AddLocationForm';

class AddMealForm extends Component {

  constructor() {
    super();
    this.renderLocationOption = this.renderLocationOption.bind(this);
    this.createMeal = this.createMeal.bind(this);
    this.showAddLocationForm = this.showAddLocationForm.bind(this);
    this.nextScreen = this.nextScreen.bind(this);
  }

  renderLocationOption(key) {
    const id = `location-option-${key}`;
    return(<option id={id} key={key} value={key}>{this.props.locations[key]['name']}</option>);
  }

  createMeal(event) {
    event.preventDefault();
    const meal = {
      location: this.location.value,
      food: this.food.value,
      bgLevel: this.bgLevel.value,
      bgMotion: this.bgMotion.value,
      bolus: this.bolus.value,
      combo: this.combo.value,
      notes: this.notes.value,
    };
    this.props.addMeal(meal);
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
    console.log(nextScreen);
    nextScreen.classList.add('current');
    nextScreen.classList.remove('next');
  }

  render() {
    return (
      <div>
        <form className="add-meal screen-container" onSubmit={this.createMeal}>
          <div id="add-meal__location" className="add-meal__location screen current">
            <div className="form-content">
              <h2>Where are you right now?</h2>
              <select name="location" ref={(input) => this.location = input}>
                {Object.keys(this.props.locations).map(this.renderLocationOption)};
              </select>
              <button onClick={(e) => this.showAddLocationForm(e) }>New</button>
            </div>
            <div className="form-nav">
              <button onClick={(e) => this.nextScreen(e, 'add-meal__food') }>Next</button>
            </div>
          </div>
          <div id="add-meal__food" className="add-meal__food screen next">
            <div className="form-content">
              <input ref={(input) => this.food = input} type="text" name="food" placeholder="Food" />
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
