import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import InputBox from './InputBox.jsx';
import arrow from'../assets/arrow.png';
import Container from'./Container.jsx';
import PasswordInput from './PasswordInput.jsx';
import Modal from './Modal.jsx';
import * as formActions from './../actions/formActions';


class SignUp extends React.Component {
  
  constructor(props) {
    super(props);
    this.drawer = React.createRef();
    this.state = {
      stage: 1,
      displayModal: false,
      displayPreview: false,
    }
  }

  handleSubmit = () => {
  }

  validateEmail = (userEmail) => {
    let email = userEmail || document.getElementById("email").value;
    if(email === "") return true;
    var res = email.split("@")[1].split(".")[0];
    if(res.toUpperCase() === "ELLISDON" || res.toUpperCase() === "ED") {
      this.setState({displayModal: true});
      return false;
    }
    return true;
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

  onChange = (key) => (e) => {
    this.props.formActions.setFormByValue(key, e.target.value);
  }

  handleSelectDropdown = (key, value) => {
    this.props.formActions.setFormByValue(key, value);
  }

  openDrawer = (value) => {
    this.drawer.current.openDrawer(value);
  } 

  onProjectFocus = () => {
    if(this.props.form.get('projects') === 'New Project') {
      this.openDrawer(true);
    }
  }

  setNewProjectValue = (key) => (e) => {
    this.props.formActions.formSetIn(['newProject', key], e.target.value);
  }

  clearDrawer = () => {
    this.props.formActions.clearNewProject();
  }

  renderDrawer = () => {
    return (
      <div className="login__drawer">
        <input 
          className="login__drawer__item"
          placeholder="project name"
          onChange={this.setNewProjectValue('name')}
          value={this.props.form.getIn(['newProject', 'name'])}
        />
        <input
          className="login__drawer__item"
          placeholder="project #"
          onChange={this.setNewProjectValue('number')}
          value={this.props.form.getIn(['newProject', 'number'])}
        />
        <input
          className="login__drawer__item"
          placeholder="project region"
          onChange={this.setNewProjectValue('region')}
          value={this.props.form.getIn(['newProject', 'region'])}
        />
        <input
          className="login__drawer__item"
          placeholder="project type"
          onChange={this.setNewProjectValue('type')}
          value={this.props.form.getIn(['newProject', 'type'])} 
          onBlur={() => this.openDrawer(false)}
        />
      </div>
    )
  }

  render() {
    let {form} = this.props;
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
              value={form.get('firstName')}
            />
            <input className="login__input login__input--small login__input--right" 
              placeholder="last name" id="lastName" key='lastName' 
              onChange={this.onChange('lastName')}
              value={form.get('lastName')}
            />
            <input className="login__input" 
              placeholder="email" id="email" key='email'
              onChange={this.onChange('newEmail')}
              value={form.get('newEmail')}
            /><br/>
            <input className="login__input" 
              placeholder="company" ref={r => this.company = r} id="company" key='company' 
              onChange={this.onChange('company')}
              value={form.get('company')}
            /><br/>
            <InputBox
              id="role"
              placeholder="role"
              onChange={this.onChange('role')}
              handleSelect={this.handleSelectDropdown}
              closeDropdownOnSelect={true}
              value={form.get('role')}
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
              onChange={form.getIn(['newProject', 'name']) !== '' ? this.setNewProjectValue('name') : this.onChange('projects')}
              handleSelect={this.handleSelectDropdown}
              value={form.getIn(['newProject', 'name']) !== '' ? form.getIn(['newProject', 'name']) : form.get('projects')}
              listItems={form.get('role') === "Project Manager" ?
                [{title:'New Project', closeOnSelect: true, openDrawer: true}, {title:'Project 1'}, {title:'Project 2'}, {title:'Project 3'}, {title:'Project 4'}, {title:'Project 5'}] :
                [{title:'Project 1'}, {title:'Project 2'}, {title:'Project 3'}, {title:'Project 4'}, {title:'Project 5'}]
              }
              ref={this.drawer}
              onFocus={this.onProjectFocus}
              drawer={this.renderDrawer()}
              clearDrawer={this.clearDrawer}
            />
            <PasswordInput 
              id="newPass"
              placeholder="new password" 
              onChange={this.onChange('newPass')}
              onFocus={() => this.openDrawer(false)}
              value={form.get('newPass')}
            />
            <PasswordInput 
              id="confirmedPass"
              placeholder="confirm password" 
              onChange={this.onChange('confirmedPass')}
              onFocus={() => this.openDrawer(false)}
              value={form.get('confirmedPass')}
            />
          </div>  
        : 
          <div>
            {this.renderHeader(`Hi ${form.get('firstName')}!`)}
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
            content={`Hi ${form.get('firstName')}! If you are an EllisDon employee, you already have your login credentials.`}
            footer={(<p>Please <Link to="/Login" className="login__modal--hyperlink">click here</Link> to go back to the Login page.</p>)}
            closeModal={this.closeModal}
          />  
        : null}
      </Container>
    );
  }
}

export default connect(
  state => {
    return {
      form: state.form
    }
  },
  dispatch => {
    return {
      formActions: bindActionCreators(formActions, dispatch)
    }
  }
)(SignUp);