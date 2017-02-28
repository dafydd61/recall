import React, { Component } from 'react';
import './App.css';
import BgButton from './BgButton';

class ConfirmMeal extends Component {

  componentWillMount() {
    this.setState({
      checkInTime: '2',
      checkInId: 'post2'
    });
  }

  showCheckInForm(e, hours) {
    e.preventDefault();
    const checkInId = `post${hours}`;
    this.setState({
      checkInTime: hours,
      checkInId: checkInId,
    });
    console.log(`Check in: ${hours}`);
    const checkInForm = document.getElementById('check-in');
    checkInForm.classList.remove('next');
  }

  hideCheckInForm(e) {
    e.preventDefault();
    const checkInForm = document.getElementById('check-in');
    checkInForm.classList.add('next');
  }

  render() {
    return (
      <div className="screen-container">
        <div className="screen">
          <h2>Bon Appétit!</h2>
          <p>Come back in a couple of hours to let me know how things are going.</p>
          <button onClick={(e) => this.showCheckInForm(e, '2')}>2 hour check-in</button>
          <button onClick={(e) => this.showCheckInForm(e, '4')}>4 hour check-in</button>
          <button type="submit">Save this meal</button>
        </div>
        <div id="check-in" className="screen next check-in">
          <h2 className="title--screen">{this.state.checkInTime} hours later. What’s your sugar doing?</h2>
          <div className="form-content">
            <div className="bg-map">
              <div className="bg-map__section bg-levels">
                {this.props.bgLevels.map((id) =>
                  <BgButton
                    key={id}
                    id={id}
                    selectedOption={this.props.bgLevel[this.state.checkInId]}
                    action={this.props.updateBg}
                    time={this.state.checkInId}
                    parameter='bgLevel'
                  />
                )}
              </div>
              <div className="bg-map__section bg-trend">
                {this.props.bgTrends.map((id) =>
                  <BgButton
                    key={id}
                    id={id}
                    selectedOption={this.props.bgTrend[this.state.checkInId]}
                    action={this.props.updateBg}
                    time={this.state.checkInId}
                    parameter='bgTrend'
                  />
                )}
              </div>
            </div>
          </div>
          <div className="form-nav">
            <button onClick={(e) => this.hideCheckInForm(e)}>OK</button>
          </div>
        </div>
      </div>
    );
  }
}

ConfirmMeal.contextTypes = {
  router: React.PropTypes.object
}

export default ConfirmMeal;
