import React from 'react';
import { Link } from 'react-router';

import './App.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>Yikes</h2>
      <p>Can't find your page.</p>
      <p><Link to='/'>OK. Homeward.</Link></p>
    </div>
  );
}

export default NotFound;
