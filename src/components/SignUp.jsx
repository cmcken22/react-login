import React from 'react';
import InputBox from './InputBox.jsx';
import GetStarted from './GetStarted.jsx';
import arrow from'../assets/arrow.png';

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
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      company: this.company.value,
      role: document.getElementById("role").value
    });
  }

  validateSignUpPart2 = () => {
    this.setState({
      password: this.password.value,
      confirmedPassword: this.confirmedPassword.value,
      project: document.getElementById("projects").value
    });
  }

  handleNext = () => {
    if(this.state.stage === 1) {
      this.validateSignUpPart1();
    } else if(this.state.stage === 2) {
      this.validateSignUpPart2();
      this.props.toggleMainBackground('grey');
    }
    if(this.state.stage !== 4) {
      this.setState({stage: this.state.stage+1});
    }
  }

  handleClickhere = () => {
    this.props.toggleLogin(true);
  }

  renderStageOne = () => {
    return(
      <div>
        <input className="login__input login__input--small login__input--left" placeholder="first name" ref={r => this.firstName = r} key='firstName' />
        <input className="login__input login__input--small login__input--right" placeholder="last name" ref={r => this.lastName = r} key='lastName' />
        <input className="login__input" placeholder="email" ref={r => this.email = r} key='email' /><br/>
        <input className="login__input" placeholder="company" ref={r => this.company = r} key='company' /><br/>
        <InputBox
          placeholder="role"
          dropdownTitle="Please select a role."
          listItems={['Project Manager', 'Subcontractor', 'Consultant', 'Owner', 'Other']}
        />
      </div>
    );
  }

  renderStageTwo = () => {
    return(
      <div>
        <InputBox
          placeholder="projects"
          dropdownTitle="Please select a project."
          listItems={['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5']}
          inputRef={r => this.project = r}
        />
        <input className="login__input" placeholder="new password" type="password" ref={r => this.password = r} key='password' /><br/>
        <input className="login__input" placeholder="confirm password" type="password" ref={r => this.confirmedPassword = r} key='confirmedPassword' /><br/>
      </div>
    );
  }

  renderSteps = () => {
    let renderCircle = (solid) => {
      return(
        <circle cx="5" cy="5" r="4"  fill={solid ? "black" : "white"} stroke={solid ? null : "black"} strokeWidth={solid ? null : "0.5"}/>
      );
    }
    return(
      <div className="login__steps">
        <svg height="10" width="20">
          {renderCircle(true)}
        </svg>
        <svg height="10" width="20">
          {renderCircle(this.state.stage > 1 ? true : false)}
        </svg>
        <svg height="10" width="10">
          {renderCircle(this.state.stage > 2 ? true : false)}
        </svg>
      </div>
    );
  }

  handleBackPress = () => {
    this.setState({stage: this.state.stage-1});
  }

  render() {
    let {stage} = this.state;

    return (
      <div className="login">
        <h1 className="login__text">{(stage !== 3 && stage !== 4) ? "Sign Up" : `Hi ${this.state.firstName}`}</h1>
        {this.state.stage === 1 ? 
          this.renderStageOne() 
        : this.state.stage === 2 ? 
          this.renderStageTwo()
        :
          <GetStarted stage={stage}/>
        }
        
        {stage !== 4 ? this.renderSteps() : null}

        {stage !== 4 ?
          <button className="login__button">
            <div className="login__button--text" onClick={this.handleNext}>Next</div>
          </button>
        :
          <div className="login__start-button-container">
            <div className="login__start-button-inner">
              <img src={arrow} className="login__arrow" height="42" width="42" onClick={this.handleBackPress}/>
              <button className="login__button login__button--start">
                <div className="login__button--text" onClick={this.handleNext}>Get Started</div>
              </button>
            </div>
          </div>
        }
        {stage !== 4 ? 
          <p className="login__bottom-text">If you have an account, please <a className="login__bottom-text--hyperlink" onClick={this.handleClickhere}>click here</a> to Log in</p>
        : null}
      </div>
    );
  }
}

export default SignUp;