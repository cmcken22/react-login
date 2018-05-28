import React from 'react';
import cx from 'classnames';
import { Link } from "react-router-dom";
import mainLogo from'../assets/gateThreeLogo.png';
import arrow from'../assets/arrow.png';
import checkmark from'../assets/success.svg';
import Container from'./Container.jsx';
import PasswordInput from './PasswordInput.jsx';

class Login extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      resetPassword: !false,
      resetSuccess: false,
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

  resetPassword = () => {
    this.setState({resetPassword: true});
  }

  goBack = () => {
    this.setState({resetPassword: false});
  }

  backToLogin = () => {
    this.setState({
      resetPassword: false,
      resetSuccess: false
    });
  }

  handleReset = () => {
    this.setState({resetSuccess: true});
  }

  render() {
    return (
      <Container className="login">

        {this.state.resetPassword ? 
          <div>
            <div className="login__header">
              <h1 className="login__text">Forgot Password?</h1>
            </div>
            
            {!this.state.resetSuccess ? 
              <div>
                <p className="login__sub-header-text">Write your email in the box below and we will email you a link to reset your password.</p>
                <input className="login__input" placeholder="email" ref={r => this.email = r}/><br/>
                
                <div className="login__button-container">
                  <img className="login__arrow" src={arrow} onClick={this.goBack}/>
                  <button className="login__button login__button--spec">
                    <div className="login__button--text" onClick={this.handleReset}>Reset</div>
                  </button>
                </div>
              </div>
            :
              <div>
                <p className="login__sub-header-text">The reset link has been set! Please check your email.</p>
                <img className="login__checkmark" src={checkmark} onClick={this.backToLogin}/>
              </div>
            }


          </div>
        : 
          <div>
            <div className="login__header">
              <h1 className="login__text">Login</h1>
            </div>
            <input className="login__input" placeholder="username" ref={r => this.userName = r}/><br/>
            <PasswordInput />

            <div className="login__forgot-pass" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onClick={this.resetPassword}>
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
          </div>
        }


      </Container>
    );
  }
}

export default Login;