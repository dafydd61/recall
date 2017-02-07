import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class NotFound extends Component {
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
          <h2>Yikes</h2>
          <p>Can't find your page.</p>
          <p><button type="submit">OK. Let's go!</button></p>
        </form>
      </div>
    );
  }
}

export default NotFound;
