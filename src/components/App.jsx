import React from 'react';
import cx from 'classnames';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import Toronto from './skylines/Toronto.jsx';
import Ottawa from './skylines/Ottawa.jsx';
import Edmonton from './skylines/Edmonton.jsx';
import Vancouver from './skylines/Vancouver.jsx';
import * as charactersActions from './../actions/charactersActions';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      currentCity: null,
      cities: [
        {
          name: 'vancouver',
          long: -123.1207,
          lat: 49.2827,
        },
        {
          name: 'ottawa',
          long: -75.6972,
          lat: 45.4215,
        },
        {
          name: 'toronto',
          long: -79.3832,
          lat: 43.6532,
        },
        {
          name: 'edmonton',
          long: -113.4909,
          lat: 53.5444,
        },
      ]
    }
  }

  componentDidMount() {
    this.props.charactersActions.init();

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition, this.geoLocationError);
    } else {
      console.log("Geolocation is not supported by your browser.");
      this.selectRandomCity();
    }
  }

  selectRandomCity = () => {
    let rand = Math.floor(Math.random() * this.state.cities.length);
    this.setState({currentCity: this.state.cities[rand].name});
  }

  showPosition = (position) => {
    let cities = this.state.cities;
    let {longitude, latitude} = position.coords;
    cities.sort((a, b) => {
      let d1 = Math.sqrt(Math.pow(a.long - longitude, 2) + Math.pow(a.lat - latitude, 2));
      let d2 = Math.sqrt(Math.pow(b.long - longitude, 2) + Math.pow(b.lat - latitude, 2));
      return d1 - d2; 
    })
    let closestCity = cities[0];
    this.setState({currentCity: closestCity.name});
    // this.setState({currentCity: 'ottawa'});
    // this.setState({currentCity: 'edmonton'});
    // this.setState({currentCity: 'vancouver'});
  }

  geoLocationError = (error) => {
    if (error.code == error.PERMISSION_DENIED) {
      console.log('geolocation permission denied');
      this.selectRandomCity();
    }
  }

  render() {
    let {currentCity} = this.state;
    
    return (
      <Router>
        <div className={`main theme-${this.state.currentCity}`}>
          
          {this.state.currentCity === 'toronto' ? 
            <Toronto/>
          : this.state.currentCity === 'ottawa' ? 
            <Ottawa/>
          : this.state.currentCity === 'edmonton' ? 
            <Edmonton/>
          : this.state.currentCity === 'vancouver' ? 
            <Vancouver/>
          : null}

          <div className="main__content">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/Login" component={Login} />
              <Route path="/SignUp" component={SignUp} />
              <Route component={NotFound} />
            </Switch>
          </div>

        </div>
      </Router>
    );
  }
}

const NotFound = () => (<h1>404</h1>)

export default connect(
  state => {
    return {
      characters: state.characters,
    }
  },
  dispatch => {
    return {
      charactersActions: bindActionCreators(charactersActions, dispatch)
    }
  }
)(App);
