import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class Setup extends Component {
  completeSetup(event) {
    event.preventDefault();
    console.log('Setup done');
    localStorage.setItem('is-setup-complete', true);
    localStorage.setItem('is-notification-allowed', true);
    this.context.router.transitionTo('/');
  }
  render() {
    return (
      <div className="Setup">
        <form className="setup" onSubmit={this.completeSetup.bind(this)}>
          <h2>Welcome to Recall</h2>
          <p>This app is designed to help you keep track of what you ate, how much insulin you took, and how it turned out.</p>
          <p>This app is strictly for record-keeping; it doesn't make recommendations either for food or insulin. That's what your health team is for.</p>
          <p><input type="checkbox" id="iGetIt" ref={(input) => {this.iGetIt = input}}/> <label htmlFor="iGetIt">I get it. This is just for record-keeping.</label></p>
          <p>Recall needs permission to send you notifications, asking you how things are going two hours and four hours after a meal.</p>
          <p><input type="checkbox" id="notifyOk" ref={(input) => {this.notifyOk = input}}/> <label htmlFor="notifyOk">Sure - send me notifications.</label></p>
          <p><button type="submit">OK. Let's go!</button></p>
        </form>
      </div>
    );
  }
}

export default Setup;
