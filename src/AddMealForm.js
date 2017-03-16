import React, { Component } from 'react';
import AddLocationForm from './AddLocationForm';
import AddFoodItems from './AddFoodItems';
import MealSummary from './MealSummary';
import BgButton from './BgButton';
import ConfirmMeal from './ConfirmMeal';

// function findAncestor (el, cls) {
//   while ((el = el.parentElement) && !el.classList.contains(cls));
//   return el;
// }


class AddMealForm extends Component {

  constructor() {
    super();
    this.renderLocationOption = this.renderLocationOption.bind(this);
    this.saveMeal = this.saveMeal.bind(this);
    this.showAddLocationForm = this.showAddLocationForm.bind(this);
    this.nextScreen = this.nextScreen.bind(this);
    this.checkLastMeal = this.checkLastMeal.bind(this);
    this.updateBg = this.updateBg.bind(this);
    this.useMeal = this.useMeal.bind(this);
    this.createCurrentMeal = this.createCurrentMeal.bind(this);
  }

  componentWillMount() {
    this.setState({
      lastMealId: '0',
      currentMeal: {
        id: '0',
        location: '',
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
      }
    });
    // this.createCurrentMeal();
  }

  createCurrentMeal(e, lastMealId) {
    e.preventDefault();
    const newMeal = this.props.createMeal(this.location.value, lastMealId);
    this.props.setCurrentMeal(newMeal.id, newMeal.properties);
    this.goToNextScreen(e);
  }

  OLDcreateCurrentMeal(e, lastMealId=0) {
    const id = Date.now();
    const lastMeal = this.props.meals[lastMealId] ? this.props.meals[lastMealId] : {}
    const location = lastMeal.location ? lastMeal.location : this.location.value;
    const foods = lastMeal.foods ? lastMeal.foods : {};
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
    // this.nextScreen();
    this.goToNextScreen(e);
  }

  goToNextScreen(e) {
    e.preventDefault();
    const nextScreen = parseInt(this.props.viewportPosition, 10) + 1;
    this.props.setViewportPosition(nextScreen);
  }

  goToPreviousScreen(e) {
    e.preventDefault();
    const nextScreen = this.props.viewportPosition - 1;
    this.props.setViewportPosition(nextScreen);
  }

  componentDidMount() {
    const locationSelect = document.getElementById('location');
    const selectedLocation = locationSelect.value;
    const lastMealId = this.props.locations[selectedLocation]['lastMeal'];
    this.setState({
      lastMealId: lastMealId,
    });
    // Set up tab focus
    const addMeal = document.querySelector('.add-meal')
    const fields = addMeal.querySelectorAll('input');
    const buttons = addMeal.querySelectorAll('button');
    const component = this;
    // fields.forEach(function(el) {
    //   el.onfocus = function() {
    //     const parentScreen = findAncestor(el, 'screen');
    //     // console.log(parentScreen, parentScreen.dataset.screenNumber);
    //     component.props.setViewportPosition(parentScreen.dataset.screenNumber);
    //   };
    // });
    // buttons.forEach(function(el) {
    //   el.onfocus = function() {
    //     const parentScreen = findAncestor(el, 'screen');
    //     // console.log(parentScreen, parentScreen.dataset.screenNumber);
    //     component.props.setViewportPosition(parentScreen.dataset.screenNumber);
    //   };
    // });
  }

  renderLocationOption(key) {
    const id = `location-option-${key}`;
    return(<option id={id} key={key} value={key}>{this.props.locations[key]['name']}</option>);
  }

  saveMeal(event) {
    event.preventDefault();
    this.props.addMeal(this.props.currentMeal);
    this.props.setViewportPosition(0);
  }

  updateBolus(e) {
    const value = e.target.value;
    const currentMeal = this.state.currentMeal;
    currentMeal[e.target.name] = value;
    this.setState({ currentMeal })
    localStorage.setItem('currentMeal', JSON.stringify(currentMeal));
  }

  checkLastMeal(currentLocation) {
    const mealId = this.props.locations[currentLocation].lastMeal || 0;
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

  showAddLocationForm(event) {
    event.preventDefault();
    const locationForm = document.getElementById('add-location');
    locationForm.classList.remove('up');
  }

  nextScreen(event, screenId, focusElement = '') {
    event.preventDefault();
    this.goToScreen(screenId, focusElement);
  }

  goToScreen(screenId, focusElement = '') {
    // const currentScreen = document.querySelector('.current');
    // currentScreen.classList.add('previous');
    // currentScreen.classList.remove('current');
    const nextScreen = document.getElementById(screenId);
    // nextScreen.classList.add('current');
    // nextScreen.classList.remove('next');
    this.setState({
      currentScreenId: screenId
    });
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

  showMealSummary(e) {
    e.preventDefault();
    const lastMealSummary = document.getElementById('add-meal__lastMealSummary');
    lastMealSummary.classList.remove('up');
  }

  hideMealSummary(e) {
    e.preventDefault();
    const lastMealSummary = document.getElementById('add-meal__lastMealSummary');
    lastMealSummary.classList.add('up');
  }

  useMeal(e, mealId) {
    const lastMealSummary = document.getElementById('add-meal__lastMealSummary');
    lastMealSummary.classList.add('up');
    this.createCurrentMeal(e, mealId);
  }

  preventSubmit() {
    return false;
  }

  render() {
    return (
      <div className={`viewport viewport-screen-${this.props.viewportPosition}`}>
        {/*<form className="add-meal screen-container" onSubmit={this.preventSubmit()}>*/}
        <div className="add-meal screen-container">
          <form id="add-meal__location" data-screen-number="0" className="add-meal__location screen current">
            <div className="form-content">
              <h2 className="title--screen">About to eat? Tell me where...</h2>
              <div className="form-controls--inline">
                <select id="location" name="location" ref={(input) => this.location = input} onChange={(e) => this.props.selectLocation(e)}>
                  {Object.keys(this.props.locations).map(this.renderLocationOption)};
                </select>
                <button className="btn btn--add" onClick={(e) => this.showAddLocationForm(e) }>+</button>
              </div>
              {this.checkLastMeal(this.props.currentLocation)}
            </div>
            <div className="form-nav">
              <button onClick={(e) => this.createCurrentMeal(e) }>New Meal</button>
            </div>
          </form>
          <form id="add-meal__food" data-screen-number="1" className="add-meal__food screen next">
            <h2 className="title--screen">What are you planning to eat?</h2>
            <div className="form-content">
              <AddFoodItems
                foods={this.props.currentMeal.foods}
                addFoodItem={this.props.addFoodItem}
                removeFoodItem={this.props.removeFoodItem}
              />
            </div>
            <div className="form-nav form-nav--inline">
              <button className="btn--form-nav" onClick={(e) => this.goToPreviousScreen(e) }><span className="fa fa-arrow-left"></span><span className="sr-only">Back</span></button>
              <button className="btn--form-nav" onClick={(e) => this.goToNextScreen(e) }><span className="fa fa-arrow-right"></span><span className="sr-only">Next</span></button>
            </div>
          </form>
          <form id="add-meal__bg" data-screen-number="2" className="add-meal__bg screen next">
            <h2 className="title--screen">What’s your sugar doing?</h2>
            <div className="form-content">
              <div className="bg-map">
                <div className="bg-map__section bg-levels">
                  {this.props.bgLevels.map((id) =>
                    <BgButton
                      key={id}
                      id={id}
                      selectedOption={this.props.currentMeal.bgLevel.pre}
                      action={this.props.updateBg}
                      time='pre'
                      parameter='bgLevel'
                      // onFocus=this.goToScreen(2)
                    />
                  )}
                </div>
                <div className="bg-map__section bg-trend">
                  {this.props.bgTrends.map((id) =>
                    <BgButton
                      key={id}
                      id={id}
                      selectedOption={this.props.currentMeal.bgTrend.pre}
                      action={this.props.updateBg}
                      time='pre'
                      parameter='bgTrend'
                      // onFocus=this.goToScreen(2)
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="form-nav form-nav--inline">
              <button className="btn--form-nav" onClick={(e) => this.goToPreviousScreen(e) }><span className="fa fa-arrow-left"></span><span className="sr-only">Back</span></button>
              <button className="btn--form-nav" onClick={(e) => this.goToNextScreen(e) }><span className="fa fa-arrow-right"></span><span className="sr-only">Next</span></button>
            </div>
          </form>
          <form id="add-meal__bolus" data-screen-number="3" className="add-meal__bolus screen next">
            <div className="form-content">
              <input ref={(input) => this.bolus = input} defaultValue={this.props.currentMeal.bolus} type="text" id="bolus" name="bolus" placeholder="Bolus" onChange={(e) => this.props.updateBolus(e)} />
              <input ref={(input) => this.combo = input} defaultValue={this.props.currentMeal.combo} type="text" name="combo" placeholder="Combo" onChange={(e) => this.props.updateBolus(e)} />
              {/*<input ref={(input) => this.notes = input} type="text" name="notes" placeholder="Notes" />*/}
            </div>
            <div className="form-nav form-nav--inline">
              <button className="btn--form-nav" onClick={(e) => this.goToPreviousScreen(e) }><span className="fa fa-arrow-left"></span><span className="sr-only">Back</span></button>
              <button onClick={(e) => this.goToNextScreen(e) }>Let’s eat <span className="fa fa-arrow-right"></span></button>
            </div>
          </form>
          <form id="add-meal__confirm" data-screen-number="4" className="add-meal__confirm screen next">
            <ConfirmMeal
              bgTrends={this.props.bgTrends}
              bgLevels={this.props.bgLevels}
              bgTrend={this.props.currentMeal.bgTrend}
              bgLevel={this.props.currentMeal.bgLevel}
              notes={this.props.currentMeal.notes}
              updateNotes={this.props.updateNotes}
              updateBg={this.props.updateBg}
              saveMeal={this.saveMeal}
            />
          </form>
        {/*</form>*/}
        </div>
        <div id="add-meal__lastMealSummary" className="add-meal__lastMealSummary drop-in up">
          <MealSummary
            mealId={this.state.lastMealId}
            meals={this.props.meals}
            nextScreen={this.nextScreen}
            useMeal={this.useMeal}
            hideMealSummary={this.hideMealSummary}
            createCurrentMeal={this.createCurrentMeal}
            currentLocation={this.props.currentLocation}
            locations={this.props.locations}
          />
        </div>
        <AddLocationForm addLocation={this.props.addLocation} />
      </div>
    )
  }
}

export default AddMealForm;
