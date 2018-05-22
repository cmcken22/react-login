import React from 'react';
import { Link } from "react-router-dom";
import cx from 'classnames';
import InputBox from './InputBox.jsx';
import GetStarted from './GetStarted.jsx';
import arrow from'../assets/arrow.png';
import mainLogo from'../assets/gateThreeLogo.png';
import Container from'./Container.jsx';
import RegistrationForm from'./RegistrationForm.jsx';
import GetStartedForm from'./GetStartedForm.jsx';

class SignUp extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      stage: 1,
      firstName: null,
      lastName: null,
      email: null,
      company: null,
      role: null,
      password: null,
      confirmedPassword: null,
      project: null
    }
  }

  handleSubmit = () => {
  }

  validateSignUpPart1 = () => {
    this.setState({
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      company: document.getElementById("company").value,
      role: document.getElementById("role").value
    });
  }

  validateSignUpPart2 = () => {
    this.setState({
      password: document.getElementById("password").value,
      confirmedPassword: document.getElementById("confirmedPassword").value,
      project: document.getElementById("projects").value
    });
  }

  handleNext = () => {
    if(this.state.stage === 1) {
      this.validateSignUpPart1();
    } else if(this.state.stage === 2) {
      this.validateSignUpPart2();
    }
    if(this.state.stage !== 4) {
      this.setState({stage: this.state.stage+1});
    }
  }

  handleClickhere = () => {
    this.props.toggleLogin(true);
  }

  handleStepClick = (index) => {
    this.setState({stage: index});
  }

  renderSteps = () => {
    let renderCircle = (solid) => {
      return(
        <circle cx="5" cy="5" r="4"  fill={solid ? "black" : "white"} stroke={solid ? null : "black"} strokeWidth={solid ? null : "0.5"}/>
      );
    }
    return(
      <div className="signup__steps">
        <svg height="10" width="20" onClick={() => this.handleStepClick(1)}>
          {renderCircle(true)}
        </svg>
        <svg height="10" width="20" onClick={this.state.stage > 1 ? () => this.handleStepClick(2) : null}>
          {renderCircle(this.state.stage > 1 ? true : false)}
        </svg>
        <svg height="10" width="10" onClick={this.state.stage > 2 ? () => this.handleStepClick(3) : null}>
          {renderCircle(this.state.stage > 2 ? true : false)}
        </svg>
      </div>
    );
  }

  goBack = () => {
    this.setState({stage: this.state.stage-1});
  }

  render() {
    let {stage} = this.state;

    return (
      <Container className={cx({
        "signup__container--yellow": stage <= 2,
        "signup__container--grey": stage > 2,
      })}>

        {(stage !== 3 && stage !== 4) ? 
          <RegistrationForm
            stage={stage}
          />
        :
          <GetStartedForm
            user={this.state.firstName}
            stage={stage}
            goBack={this.goBack}
          />
        }

        {stage !== 4 ? this.renderSteps() : null}

        {stage !== 4 ?
          <button className="login__button">
            <div className="login__button--text" onClick={this.handleNext}>Next</div>
          </button>
        : null}

        {stage !== 4 ? 
          <p className="login__bottom-text">If you have an account, please <Link to="/Login" className="login__bottom-text--hyperlink">click here</Link> to Log in</p>
        : null} 
      </Container>
    );
  }
}

export default SignUp;