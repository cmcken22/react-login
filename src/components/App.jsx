import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Login from './Login';
import SignUp from './SignUp';
import * as charactersActions from './../actions/charactersActions';
import * as locationActions from './../actions/locationActions';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.charactersActions.init();
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition, this.geoLocationError);
    } else {
      console.log("geolocation is not supported by your browser");
      this.selectRandomCity();
    }
  }

  selectRandomCity = () => {
    let rand = Math.floor(Math.random() * this.props.cities.size);
    this.props.locationActions.setLocation(this.props.cities.getIn([rand, 'name']));
  }

  showPosition = (position) => {
    let {longitude, latitude} = position.coords;
    let distance = 1000000, closestCity = null;
    this.props.cities.map(city => {
      let a = city.get('long') - longitude;
      let b = city.get('lat') - latitude;
      let c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
      if(c <= distance) {
        distance = c;
        closestCity = city.get('name');
      }
    })
    this.props.locationActions.setLocation(closestCity);
    // this.props.locationActions.setLocation('ottawa');
    // this.props.locationActions.setLocation('edmonton');
    // this.props.locationActions.setLocation('vancouver');
  }

  geoLocationError = (error) => {
    if (error.code === error.PERMISSION_DENIED) {
      console.log('geolocation permission denied');
      this.selectRandomCity();
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/Login" component={Login} />
          <Route path="/SignUp" component={SignUp} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

const NotFound = () => (<h1>404</h1>)

export default connect(
  state => {
    return {
      characters: state.characters,
      cities: state.location.get('cities'),
    }
  },
  dispatch => {
    return {
      charactersActions: bindActionCreators(charactersActions, dispatch),
      locationActions: bindActionCreators(locationActions, dispatch),
    }
  }
)(App);
