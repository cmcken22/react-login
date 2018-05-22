import React from 'react';
import { Link } from "react-router-dom";
import cx from 'classnames';
import InputBox from './InputBox.jsx';
import GetStarted from './GetStarted.jsx';
import arrow from'../assets/arrow.png';
import mainLogo from'../assets/gateThreeLogo.png';
import Container from'./Container.jsx';

class RegistrationForm extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  renderStageOne = () => {
    return(
      <div>
        <input className="login__input login__input--small login__input--left" placeholder="first name" id="firstName" key='firstName' />
        <input className="login__input login__input--small login__input--right" placeholder="last name" id="lastName" key='lastName' />
        <input className="login__input" placeholder="email" ref={r => this.email = r} id="email" key='email' /><br/>
        <input className="login__input" placeholder="company" ref={r => this.company = r} id="company" key='company' /><br/>
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
        <input className="login__input" placeholder="new password" type="password" id="password" key='password' /><br/>
        <input className="login__input" placeholder="confirm password" type="password" id="confirmedPassword" key='confirmedPassword' /><br/>
      </div>
    );
  }

  render() {
    let {stage} = this.props;
    return (
      <div>
        <h1 className="login__text">Sign Up</h1>
        {stage === 1 ? this.renderStageOne() : this.renderStageTwo()}
      </div>
    );
  }
}

export default RegistrationForm;