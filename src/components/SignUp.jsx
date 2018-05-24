import React from 'react';
import { Link } from "react-router-dom";
import cx from 'classnames';
import InputBox from './InputBox.jsx';
import arrow from'../assets/arrow.png';
import Container from'./Container.jsx';
import PasswordInput from './PasswordInput.jsx';
import RegistrationForm from'./RegistrationForm.jsx';
import GetStartedForm from'./GetStartedForm.jsx';
import Modal from './Modal.jsx';


class SignUp extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      stage: 1,
      displayModal: false,
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

  validateEmail = (email) => {
    console.log(email);
    var res = email.split("@")[1].split(".")[0];
    console.log(res);
    if(res.toUpperCase() === "ELLISDON") {
      this.setState({displayModal: true});
    }
  }

  validateSignUpPart1 = () => {
    this.setState({
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      company: document.getElementById("company").value,
      role: document.getElementById("role").value
    });
    this.validateEmail(document.getElementById("email").value);
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
      // this.validateSignUpPart2();
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
        <circle cx="5" cy="5" r="4"  
          className={cx({
            "login__circle--solid": solid,
            "login__circle--empty": !solid
          })}
        />
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

  closeModal = () => {
    this.setState({displayModal: false});
  }

  render() {
    let {stage} = this.state;

    return (
      <Container className="login">
        <h1 className="login__text">Sign Up</h1>
        <input className="login__input login__input--small login__input--left" placeholder="first name" id="firstName" key='firstName' />
        <input className="login__input login__input--small login__input--right" placeholder="last name" id="lastName" key='lastName' />
        <input className="login__input" placeholder="email" ref={r => this.email = r} id="email" key='email' /><br/>
        <input className="login__input" placeholder="company" ref={r => this.company = r} id="company" key='company' /><br/>
        <InputBox
          placeholder="role"
          dropdownTitle="Please select a role."
          listItems={['Project Manager', 'Subcontractor', 'Consultant', 'Owner', 'Other']}
        />

        {this.renderSteps()}

        {this.state.displayModal ? 
          <Modal 
            className="login__modal"
            title="OOPS..."
            content={`Hi ${this.state.firstName}! If you are an EllisDon employee, you already have your login credentials.`}
            footer={(<p>Please <Link to="/Login" className="login__modal--hyperlink">click here</Link> to go back to the Login page.</p>)}
            closeModal={this.closeModal}
          />  
        : null}

        <button className="login__button">
          <div className="login__button--text" onClick={this.handleNext}>Next</div>
        </button>
        <p className="login__bottom-text">If you have an account, please <Link to="/Login" className="login__bottom-text--hyperlink">click here</Link> to Log in</p>
      </Container>
    );
  }
}

export default SignUp;