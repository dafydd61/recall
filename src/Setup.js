import React, { Component } from 'react';
import './App.css';

class Setup extends Component {
  completeSetup(event) {
    event.preventDefault();
    console.log('Setup done');
    localStorage.setItem('is-setup-complete', true);
    this.context.router.push('/');
  }
  render() {
    return (
      <div className="Setup screen">
        <form className="setup" onSubmit={this.completeSetup.bind(this)}>
          <h2>Welcome to Recall</h2>
          <p>We’re testing! There’s a good chance you’ll come across some bugs. Until we get everything ironed out, you’ll get the best experience possible using an iPhone.</p>
          <p>This app is designed to help you keep track of what you ate, how much insulin you took, and how it turned out.</p>
          <p>This app is strictly for record-keeping; it doesn't make recommendations either for food or insulin. That's what your health team is for.</p>
          <p><input type="checkbox" id="iGetIt" ref={(input) => {this.iGetIt = input}}/> <label htmlFor="iGetIt">I get it. This is just for record-keeping.</label></p>
          {/*
          <p>Recall needs permission to send you notifications, asking you how things are going two hours and four hours after a meal.</p>
          <p><input type="checkbox" id="notifyOk" ref={(input) => {this.notifyOk = input}}/> <label htmlFor="notifyOk">Sure - send me notifications.</label></p>
          */}
          <p><button type="submit">OK. Let's go!</button></p>
        </form>
      </div>
    );
  }
}

Setup.contextTypes = {
  router: React.PropTypes.object
}

export default Setup;
