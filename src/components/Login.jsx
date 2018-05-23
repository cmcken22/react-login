import React from 'react';
import cx from 'classnames';
import { Link } from "react-router-dom";
import mainLogo from'../assets/gateThreeLogo.png';
import Container from'./Container.jsx';
import PasswordInput from './PasswordInput.jsx';

class Login extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    }
  }

  handleSubmit = () => {
    this.props.toggleLogin(false);
  }

  handleClickhere = () => {
    this.props.toggleLogin(false);
  }

  onMouseEnter = () => {
    this.setState({hover: true});
  }
  
  onMouseLeave = () => {
    this.setState({hover: false});
  }

  render() {
    return (
      <Container className="login">
        {/* <div className="login"> */}
          <h1 className="login__text">Login</h1>
          <input className="login__input" placeholder="username" ref={r => this.userName = r}/><br/>
          <PasswordInput />

          <div className="login__forgot-pass" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
            <svg height="20" width="20">
              <circle cx="10" cy="11" r="4" className={cx({
                "login__forgot-pass--circle": !this.state.hover,
                "login__forgot-pass--solid": this.state.hover
              })}/>
            </svg>
            <p className="login__bottom-text login__forgot-pass--text">Forgot Password?</p>
          </div>
          <br/>

          <button className="login__button">
            <div className="login__button--text" onClick={this.handleSubmit}>Enter</div>
          </button>
          <p className="login__bottom-text">If you are new to Gate Three, please <Link to="/SignUp" className="login__bottom-text--hyperlink">click here</Link> to sign up</p>
        {/* </div> */}
      </Container>
    );
  }
}

export default Login;