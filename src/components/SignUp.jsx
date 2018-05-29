import React from 'react';
import { Link } from "react-router-dom";
import cx from 'classnames';
import InputBox from './InputBox.jsx';
import arrow from'../assets/arrow.png';
import Container from'./Container.jsx';
import PasswordInput from './PasswordInput.jsx';
import Modal from './Modal.jsx';


class SignUp extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      stage: 1,
      displayModal: false,
      displayPreview: false,
      drawerOpen: false,
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      role: "",
      password: "",
      confirmedPassword: "",
      projects: ""
    }
  }

  handleSubmit = () => {
  }

  validateEmail = (userEmail) => {
    let email = userEmail || document.getElementById("email").value;
    console.log(email);
    if(email === "") return true;
    var res = email.split("@")[1].split(".")[0];
    if(res.toUpperCase() === "ELLISDON" || res.toUpperCase() === "ED") {
      this.setState({displayModal: true});
      return false;
    }
    return true;
  }

  validateSignUpPart1 = () => {
    this.setState({
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      company: document.getElementById("company").value,
      role: document.getElementById("role").value
    });
    return this.validateEmail(document.getElementById("email").value);
  }

  validateSignUpPart2 = () => {
    if(document.getElementById("newPass").value === document.getElementById("confirmedPass").value) {
      this.setState({
        password: document.getElementById("newPass").value,
        confirmedPassword: document.getElementById("confirmedPass").value,
        projects: document.getElementById("projects").value
      });
      return true;
    }
    return false;
  }

  handleNext = () => {
    // let valid = false;
    // if(this.state.stage === 1) {
    //   valid = this.validateSignUpPart1();
    // } else if(this.state.stage === 2) {
    //   this.validateSignUpPart2();
    //   valid = true;
    // } else {
    //   valid = true;
    // }
    // if(valid) {
      this.setState({stage: this.state.stage+1});
    // }
  }

  handleStepClick = (index) => {
    this.setState({stage: index});
  }

  renderSteps = () => {
    let renderCircle = (solid) => {
      return(
        <circle cx="5" cy="5" r="4"  
          className={cx("login__circle", {
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

  renderHeader = (title) => {
    return (
      <div className="login__header">
        {this.state.stage !== 1 && this.state.stage !== 4 ?
          <img className="login__arrow" src={arrow} onClick={this.goBack}/>
        : null}
        <h1 className="login__text">{title}</h1>
      </div>
    );
  }

  showPreview = () => {
    this.setState({displayPreview: !this.state.displayPreview});
  }

  openDrawer = (value) => {
    this.setState({drawerOpen: value});
  }

  onProjectBlur = () => {
    let project = document.getElementById("projects").value;
    if(project === "New Project") {
      this.openDrawer(true);
    } else {
      this.openDrawer(false);
    }
  }

  onProjectFocus = () => {
    let project = document.getElementById("projects").value;
    if(project === "New Project") {
      this.openDrawer(true);
    }
  }

  onChange = (key) => (e) => {
    this.setState({[key]: e.target.value});
  }

  handleSelectDropdown = (key, value) => {
    this.setState({[key]: value});
  }

  render() {
    let {stage} = this.state;
    let stage3_text = "One last thing before we log you in. We would like to know if you want to customize your dashboard or if you would like to use our existing template?";
    let stage4_text = "Thank you! You can always customize your dashboard later, but for now click below to get started, or go back if you change your mind.";
    
    return (
      <Container className="login">
        {this.state.stage === 1 ?
          <div>
            {this.renderHeader("Sign Up")}
            <br/>
            <input className="login__input login__input--small login__input--left" 
              placeholder="first name" id="firstName" key='firstName' 
              onChange={this.onChange('firstName')}
              value={this.state.firstName}
            />
            <input className="login__input login__input--small login__input--right" 
              placeholder="last name" id="lastName" key='lastName' 
              onChange={this.onChange('lastName')}
              value={this.state.lastName}
            />
            <input className="login__input" 
              placeholder="email" ref={r => this.email = r} id="email" key='email'
              onChange={this.onChange('email')}
              value={this.state.email}
            /><br/>
            <input className="login__input" 
              placeholder="company" ref={r => this.company = r} id="company" key='company' 
              onChange={this.onChange('company')}
              value={this.state.company}
            /><br/>
            <InputBox
              id="role"
              placeholder="role"
              onChange={this.onChange('role')}
              handleSelect={this.handleSelectDropdown}
              value={this.state.role}
              dropdownTitle="Please select a role."
              listItems={[{title:'Project Manager'}, {title:'Subcontractor'}, {title:'Consultant'}, {title:'Owner'}, {title:'Other'}]}
            />
          </div>
        : this.state.stage === 2 ?
          <div>
            {this.renderHeader("Sign Up")}
            <InputBox
              classname={cx({"login__projects-dropdown": this.state.drawerOpen})}
              id="projects"
              placeholder="projects"
              dropdownTitle="Please select all that apply."
              onChange={this.onChange('projects')}
              handleSelect={this.handleSelectDropdown}
              value={this.state.projects}
              listItems={
              this.state.role === "Project Manager" ?
                [{title:'New Project', closeOnSelect: true}, {title:'Project 1'}, {title:'Project 2'}, {title:'Project 3'}, {title:'Project 4'}, {title:'Project 5'}] :
                [{title:'Project 1'}, {title:'Project 2'}, {title:'Project 3'}, {title:'Project 4'}, {title:'Project 5'}]
              }
              onBlur={this.onProjectBlur}
              onFocus={this.onProjectFocus}
            />
            {this.state.drawerOpen ? 
              <div className="login__drawer">
                <input className="login__drawer__item" placeholder="project name"/>
                <input className="login__drawer__item" placeholder="project #"/>
                <input className="login__drawer__item" placeholder="project region"/>
                <input className="login__drawer__item" placeholder="project type" onBlur={() => this.openDrawer(false)}/>
              </div>
            : null}
            <PasswordInput 
              id="newPass"
              placeholder="new password" 
              onChange={this.onChange('newPass')}
              onFocus={() => this.openDrawer(false)}
              value={this.state.newPass}
            />
            <PasswordInput 
              id="confirmedPass"
              placeholder="confirm password" 
              onChange={this.onChange('confirmedPass')}
              onFocus={() => this.openDrawer(false)}
              value={this.state.confirmedPass}
            />
          </div>  
        : 
          <div>
            {this.renderHeader(`Hi ${this.state.firstName}!`)}
            {this.state.stage === 3 ? 
              <div>
                <p className="login__getstarted__text login__getstarted__text--small-bm">{stage3_text}</p>
                <p className="login__getstarted__text login__getstarted__text--bold"><span className="login__getstarted__text--italic">Click here</span> to preview both or choose below.</p>
                <div className="login__getstarted-buttons">
                  <button className="login__getstarted-button login__getstarted-button--left">
                    <div className="login__getstarted-button__text">Customize</div>
                  </button>
                  <button className="login__getstarted-button  login__getstarted-button--right"  onClick={this.showPreview}>
                    <div className="login__getstarted-button__text login__getstarted-button__text--white">Existing</div>
                  </button>
                </div>
              </div>  
            : 
              <div>
                <p className="login__getstarted__text">{stage4_text}</p>
                <div className="login__button-container">
                  <img className="login__arrow" src={arrow} onClick={this.goBack}/>
                  <button className="login__button" style={{width: '12vw'}}>
                    <div className="login__button--text">Get Started</div>
                  </button>
                </div>
              </div>
            }

          </div>
        }

        {this.state.stage !== 4 ?
          <div>
            {this.renderSteps()}
            <button className="login__button" onClick={this.handleNext}>
              <div className="login__button--text">Next</div>
            </button>
            <p className="login__bottom-text">If you have an account, please <Link to="/Login" className="login__bottom-text--hyperlink">click here</Link> to Log in</p>
          </div>
        : null}

        {this.state.displayModal ? 
          <Modal 
            className="login__modal"
            title="OOPS..."
            content={`Hi ${this.state.firstName}! If you are an EllisDon employee, you already have your login credentials.`}
            footer={(<p>Please <Link to="/Login" className="login__modal--hyperlink">click here</Link> to go back to the Login page.</p>)}
            closeModal={this.closeModal}
          />  
        : null}
      </Container>
    );
  }
}

export default SignUp;