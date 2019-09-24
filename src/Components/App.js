import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import '../Css/App.css';
import BookAPICall from './BookAPICall.js' 

import GetReadingList from "./GetReadingList.js";



class App extends Component {
    constructor(){
        super()
        this.state = {
    click:false
        }
        this.ButtonPress = this.ButtonPress.bind(this)

    }
    

    ButtonPress(){
        this.setState(prevState => ({
            click: !prevState.click
          }));
    
console.log(this.state.click)
    }
  render() {
      let  classsNameOfNavbar = this.state.click ? 'navbar' : 'navbar1'
    return (
        <div>
            <button onClick={this.ButtonPress}>Push</button>
      <Router>
<div className="nav-container">
          <nav className={classsNameOfNavbar}>
            <a className="navbar-brand" href="http://localhost:3000.com" target="_blank"  rel="noopener noreferrer">
            
            </a>
            <Link to="/" className="navbar-brand"></Link>
            <div className="test">
              <ul className="nav">
                <li className="navbar-item">
                <Link to="/FindBooks" className="nav-link">Find books</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/ReadingList" className="nav-link">Reading list</Link>
                </li>

              </ul>
            </div>
          </nav>
          <br/>

        
        
<Route path="/ReadingList/" component={GetReadingList} />
<Route path="/FindBooks/" component={BookAPICall} />

         
        </div>
      </Router>
      </div>
    );
  }
}

export default App;