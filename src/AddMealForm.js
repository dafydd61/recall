import React, { Component } from 'react';
import AddLocationForm from './AddLocationForm';
import AddFoodItems from './AddFoodItems';
import MealSummary from './MealSummary';
import BgButton from './BgButton';
import ConfirmMeal from './ConfirmMeal';

class AddMealForm extends Component {

  constructor() {
    super();
    this.renderLocationOption = this.renderLocationOption.bind(this);
    this.createMeal = this.createMeal.bind(this);
    this.showAddLocationForm = this.showAddLocationForm.bind(this);
    this.nextScreen = this.nextScreen.bind(this);
    this.selectLocation = this.selectLocation.bind(this);
    this.addFoodItem = this.addFoodItem.bind(this);
    this.removeFoodItem = this.removeFoodItem.bind(this);
    this.updateBg = this.updateBg.bind(this);
    this.useMeal = this.useMeal.bind(this);
    this.createCurrentMeal = this.createCurrentMeal.bind(this);
    this.updateNotes = this.updateNotes.bind(this);
  }

  componentWillMount() {
    this.setState({
      lastMealId: '0',
    });
    this.createCurrentMeal();
  }

  createCurrentMeal(lastMealId=0) {
    const id = Date.now();
    const lastMeal = this.props.meals[lastMealId] ? this.props.meals[lastMealId] : {}
    const location = lastMeal.location ? lastMeal.location : '';
    const foods = lastMeal.foods ? lastMeal.foods : [];
    const bolus = lastMeal.bolus ? lastMeal.bolus : '';
    const combo = lastMeal.combo ? lastMeal.combo : '';
    const currentMeal = {
      id: id,
      location: location,
      foods: foods,
      bolus: bolus,
      combo: combo,
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
    this.setState({ currentMeal });
    localStorage.setItem('currentMeal', JSON.stringify(currentMeal));
  }

  componentDidMount() {
    const locationSelect = document.getElementById('location');
    const selectedLocation = locationSelect.value;
    const lastMealId = this.props.locations[selectedLocation]['lastMeal'];
    const currentMeal = this.state.currentMeal;
    currentMeal.location = selectedLocation;
    this.setState({
      lastMealId: lastMealId,
      currentMeal: currentMeal,
    });
    localStorage.setItem('currentMeal', JSON.stringify(currentMeal));
  }

  renderLocationOption(key) {
    const id = `location-option-${key}`;
    return(<option id={id} key={key} value={key}>{this.props.locations[key]['name']}</option>);
  }

  createMeal(event) {
    event.preventDefault();
    this.props.addMeal(this.state.currentMeal);
  }

  // createMeal(event) {
  //   event.preventDefault();
  //   const meal = {
  //     location: this.location.value,
  //     foods: this.state.foods,
  //     bgLevel: {
  //       pre:this.state.bgLevel.pre,
  //       post2:this.state.bgLevel.post2,
  //       post4:this.state.bgLevel.post4,
  //     },
  //     bgTrend: {
  //       pre:this.state.bgTrend.pre,
  //       post2:this.state.bgTrend.post2,
  //       post4:this.state.bgTrend.post4,
  //     },
  //     bolus: this.bolus.value,
  //     combo: this.combo.value,
  //     notes: this.notes.value,
  //   };
  //   this.props.addMeal(meal);
  // }

  updateBolus(e) {
    const value = e.target.value;
    const currentMeal = this.state.currentMeal;
    currentMeal[e.target.name] = value;
    this.setState({ currentMeal })
    localStorage.setItem('currentMeal', JSON.stringify(currentMeal));
  }

  addFoodItem(index, foodItem) {
    const currentMeal = this.state.currentMeal;
    console.log(currentMeal);
    currentMeal.foods.push(foodItem);
    this.setState({ currentMeal })
    localStorage.setItem('currentMeal', JSON.stringify(currentMeal));
  }

  removeFoodItem(index) {
    const currentMeal = this.state.currentMeal;
    currentMeal.foods = [
      ...currentMeal.foods.slice(0, index),
      ...currentMeal.foods.slice(index + 1)
    ];
    this.setState({ currentMeal })
    localStorage.setItem('currentMeal', JSON.stringify(currentMeal));
  }

  selectLocation() {
    const selectedLocation = this.location.value;
    const lastMealId = this.props.locations[selectedLocation]['lastMeal'];
    const currentMeal = this.state.currentMeal;
    currentMeal.location = selectedLocation;
    this.setState({
      lastMealId: lastMealId,
      currentMeal: currentMeal,
    });
    localStorage.setItem('currentMeal', JSON.stringify(currentMeal));
  }

  showAddLocationForm(event) {
    event.preventDefault();
    const locationForm = document.getElementById('add-location');
    locationForm.classList.remove('up');
  }

  nextScreen(event, screenId, focusElement = '') {
    event.preventDefault();
    const currentScreen = document.querySelector('.current');
    currentScreen.classList.add('previous');
    currentScreen.classList.remove('current');
    const nextScreen = document.getElementById(screenId);
    nextScreen.classList.add('current');
    nextScreen.classList.remove('next');
    if (focusElement !== '') {
      nextScreen.addEventListener('transitionend', function() {document.getElementById(focusElement).focus()});
    }
  }

  updateBg(e, newData, parameter, time) {
    e.preventDefault();
    const paramToEdit = this.state.currentMeal[parameter];
    console.log(paramToEdit);
    paramToEdit[time] = newData;
    console.log(paramToEdit);
    this.setState({
      paramToEdit
    });
  }

  updateNotes(newNotes) {
    const currentMeal = this.state.currentMeal;
    currentMeal.notes = newNotes;
    this.setState({
      currentMeal
    });
    localStorage.setItem('currentMeal', JSON.stringify(currentMeal));
  }

  checkLastMeal(mealId) {
    if (mealId === '0') {
      return (
        <div className="info">
          <p>You haven't eaten here before.</p>
        </div>
      )
    } else {
      return (
        <div className="info">
          <p>You’ve eaten here before.</p>
          <p><a href="#" onClick={(e) => this.showMealSummary(e)}>Review</a></p>
        </div>
      )
    }
  }

  showMealSummary(e) {
    e.preventDefault();
    const lastMealSummary = document.getElementById('add-meal__lastMealSummary');
    lastMealSummary.classList.remove('up');
  }

  useMeal(e, mealId) {
    // const mealToUse = this.props.meals[mealId];
    // this.setState({
      // foods: mealToUse.foods,
    // });
    this.createCurrentMeal(mealId);
    this.nextScreen(e, 'add-meal__food', 'newFoodItem')
  }

  render() {
    return (
      <div>
        <form className="add-meal screen-container" onSubmit={this.createMeal}>
          <div id="add-meal__location" className="add-meal__location screen current">
            <div className="form-content">
              <h2 className="title--screen">About to eat? Tell me where...</h2>
              <div className="form-controls--inline">
                <select id="location" name="location" ref={(input) => this.location = input} onChange={this.selectLocation}>
                  {Object.keys(this.props.locations).map(this.renderLocationOption)};
                </select>
                <button className="btn btn--add" onClick={(e) => this.showAddLocationForm(e) }>+</button>
              </div>
              {this.checkLastMeal(this.state.lastMealId)}
            </div>
            <div className="form-nav">
              <button onClick={(e) => this.nextScreen(e, 'add-meal__food', 'newFoodItem') }>New Meal</button>
            </div>
          </div>
          <div id="add-meal__lastMealSummary" className="add-meal__lastMealSummary screen up">
            <MealSummary
              mealId={this.state.lastMealId}
              meals={this.props.meals}
              nextScreen={this.nextScreen}
              useMeal={this.useMeal}
            />
          </div>
          <div id="add-meal__food" className="add-meal__food screen next">
            <h2 className="title--screen">What are you planning to eat?</h2>
            <div className="form-content">
              <AddFoodItems
                foods={this.state.currentMeal.foods}
                addFoodItem={this.addFoodItem}
                removeFoodItem={this.removeFoodItem}
              />
            </div>
            <div className="form-nav">
              <button onClick={(e) => this.nextScreen(e, 'add-meal__bg') }>Next</button>
            </div>
          </div>
          <div id="add-meal__bg" className="add-meal__bg screen next">
            <h2 className="title--screen">What’s your sugar doing?</h2>
            <div className="form-content">
              <div className="bg-map">
                <div className="bg-map__section bg-levels">
                  {this.props.bgLevels.map((id) =>
                    <BgButton
                      key={id}
                      id={id}
                      selectedOption={this.state.currentMeal.bgLevel.pre}
                      action={this.updateBg}
                      time='pre'
                      parameter='bgLevel'
                    />
                  )}
                </div>
                <div className="bg-map__section bg-trend">
                  {this.props.bgTrends.map((id) =>
                    <BgButton
                      key={id}
                      id={id}
                      selectedOption={this.state.currentMeal.bgTrend.pre}
                      action={this.updateBg}
                      time='pre'
                      parameter='bgTrend'
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="form-nav">
              <button onClick={(e) => this.nextScreen(e, 'add-meal__bolus', 'bolus') }>Next</button>
            </div>
          </div>
          <div id="add-meal__bolus" className="add-meal__bolus screen next">
            <div className="form-content">
              <input ref={(input) => this.bolus = input} type="number" id="bolus" name="bolus" placeholder="Bolus" onChange={(e) => this.updateBolus(e)} />
              <input ref={(input) => this.combo = input} type="text" name="combo" placeholder="Combo" onChange={(e) => this.updateBolus(e)} />
              {/*<input ref={(input) => this.notes = input} type="text" name="notes" placeholder="Notes" />*/}
            </div>
            <div className="form-nav">
              <button onClick={(e) => this.nextScreen(e, 'add-meal__confirm') }>Ok. Let's eat.</button>
            </div>
          </div>
          <div id="add-meal__confirm" className="add-meal__confirm screen next">
            <ConfirmMeal
              bgTrends={this.props.bgTrends}
              bgLevels={this.props.bgLevels}
              bgTrend={this.state.currentMeal.bgTrend}
              bgLevel={this.state.currentMeal.bgLevel}
              notes={this.state.currentMeal.notes}
              updateNotes={this.updateNotes}
              updateBg={this.updateBg}
            />
          </div>
        </form>
        <AddLocationForm addLocation={this.props.addLocation} />
      </div>
    )
  }
}

export default AddMealForm;
