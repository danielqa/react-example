import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router';

class App extends Component {

  render() {
    return (
      <div>
        <div id="menu">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/autor">Autor</Link></li>
            <li><Link to="/livro">Livro</Link></li>
          </ul>
        </div>
        <div id="main">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;