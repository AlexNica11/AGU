import React from 'react';
import './App.css';
import Articles from './components/Articles';

function App() {
  return (
      <div className="container-fluid">
        <nav>
          <div className="nav-wrapper center-align">
            <a href="/" className="brand-logo">Articles</a>
          </div>
        </nav>
        <div className="row">
          <Articles />
        </div>
      </div>
  );
}

export default App;
