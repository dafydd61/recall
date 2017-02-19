import React, { Component } from 'react';
// var Slider = require('react-slick');
import Slider from 'react-slick';
import AddLocationForm from './AddLocationForm';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class AddMealForm extends Component {

  constructor() {
    super();
    this.renderLocationOption = this.renderLocationOption.bind(this);
    this.createMeal = this.createMeal.bind(this);
    this.showAddLocationForm = this.showAddLocationForm.bind(this);
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
    console.log('Add Location');
  }

  render() {
    const settings = {
      dots: false,
      arrows: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      cssEase: 'cubic-bezier(0.43, 0.06, 0.62, 1.31)'
    }
    return (
      <div>
        <AddLocationForm addLocation={this.props.addLocation} />
        <form className="add-meal" onSubmit={this.createMeal}>
          <Slider {...settings}>
            <div>
              <select name="location" ref={(input) => this.location = input}>
                {Object.keys(this.props.locations).map(this.renderLocationOption)};
              </select>
              <button onClick={(e) => this.showAddLocationForm(e) }>New</button>
            </div>
            <div>
              <input ref={(input) => this.food = input} type="text" name="food" placeholder="Food" />
            </div>
            <div>
              <input ref={(input) => this.bgLevel = input} type="text" name="bgLevel" placeholder="Bglevel" />
              <input ref={(input) => this.bgMotion = input} type="text" name="bgMotion" placeholder="Bgmotion" />
            </div>
            <div>
              <input ref={(input) => this.bolus = input} type="text" name="bolus" placeholder="Bolus" />
              <input ref={(input) => this.combo = input} type="text" name="combo" placeholder="Combo" />
              <input ref={(input) => this.notes = input} type="text" name="notes" placeholder="Notes" />
            </div>
          </Slider>
        </form>
      </div>
    )
  }
}

export default AddMealForm;
