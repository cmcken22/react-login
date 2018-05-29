import React from 'react';
import cx from 'classnames';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import Toronto from './skylines/Toronto.jsx';
import Ottawa from './skylines/Ottawa.jsx';
import Edmonton from './skylines/Edmonton.jsx';
import Vancouver from './skylines/Vancouver.jsx';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
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
      ],
      currentCity: null
    }
  }

  componentDidMount() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition, this.geoLocationError);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
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
      this.setState({currentCity: 'toronto'});
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

export default App;