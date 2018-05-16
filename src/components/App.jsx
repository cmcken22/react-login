import React from 'react';
import cx from 'classnames';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import mainLogo from'../assets/gateThreeLogo.png';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      login: !true,
      loginSuccess: false
    }
  }

  toggleLogin = (value) => {
    this.setState({login: value});
  }

  render() {
    return (
      <div className={cx("main__container", {
        "main__container--grey": this.state.login,
        "main__container--yellow": !this.state.login,
      })}>
        <div className="component__container">
          <div className="component__image">
            <img className="component__logo" src={mainLogo}/>
          </div>
          {this.state.login ?
            <Login toggleLogin={this.toggleLogin}/>
          : this.state.loginSuccess ? 
            <SignUp toggleLogin={this.toggleLogin}/>
          :
            <SignUp toggleLogin={this.toggleLogin}/>
          }
        </div>
      </div>
    );
  }
}

export default App;