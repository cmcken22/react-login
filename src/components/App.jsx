import React from 'react';
import cx from 'classnames';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import mainLogo from'../assets/gateThreeLogo.png';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      login: true,
      background: null
    }
  }

  toggleLogin = (value) => {
    if(!value) {
      this.setState({login: value, background: null});
    } else {
      this.setState({login: value});
    }
  }

  toggleMainBackground = (value) => {
    this.setState({background: value});
  }

  render() {
    return (
      <Router>
        <div className={cx("main__container", {
          "main__container--grey": this.state.login || this.state.background === 'grey',
          "main__container--yellow": !this.state.login && this.state.background !== 'grey',
        })}>
          <div className="component__container">
            <div className="component__image">
              <img className="component__logo" src={mainLogo}/>
            </div>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/Login" component={Login} />
              <Route path="/SignUp" component={SignUp} />
              <Route component={NotFound} />
            </Switch>

            {/* {this.state.login ?
              <Login toggleLogin={this.toggleLogin}/>
            :
              <SignUp 
                toggleLogin={this.toggleLogin}
                toggleMainBackground={this.toggleMainBackground}
              />
            } */}

          </div>
        </div>
      </Router>
    );
  }
}

const NotFound = () => (<h1>404</h1>)

export default App;