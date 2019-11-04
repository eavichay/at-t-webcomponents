import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';

import 'components/menu/a-menu';
import 'components/menu/a-menu-item';
import 'components/menu/a-popup-menu';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedOption: null
    };
    this.handleSelectedItem = this.handleSelectedItem.bind(this);
  }
  componentDidMount () {
    ReactDOM.findDOMNode(this).addEventListener('selected', this.handleSelectedItem);
  }
  componentWillUnmount () {
    ReactDOM.findDOMNode(this).removeEventListener('selected', this.handleSelectedItem);
  }
  handleSelectedItem (event) {
    this.setState({
      selectedOption: event.target.innerText
    });
  }
  render () {
    return (
      <div className="App">
        <header className="App-header">
          <a-popup-menu ref={this.popupMenu}>
            <span slot="trigger">Open Menu
              <span role="img" aria-label="arrow-down">⬇️</span>
            </span>
            <a-menu>
              <div className="menu-header">Select an option</div>
              <a-menu-item>Option 1</a-menu-item>
              <a-menu-item disabled>Disabled option</a-menu-item>
              <a-menu-item>Option 2</a-menu-item>
              <a-menu-item>Another option</a-menu-item>
              <a-menu-item>Yet another one</a-menu-item>
              <a-menu-item>Quit</a-menu-item>
            </a-menu>
          </a-popup-menu>
          { this.state.selectedOption && <h3>{this.state.selectedOption}</h3>}
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
      </div>
    );
  }
}

export default App;
