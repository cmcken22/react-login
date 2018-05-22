import React from 'react';
import { Link } from "react-router-dom";
import cx from 'classnames';
import InputBox from './InputBox.jsx';
import GetStarted from './GetStarted.jsx';
import arrow from'../assets/arrow.png';
import mainLogo from'../assets/gateThreeLogo.png';
import Container from'./Container.jsx';

class GetStartedForm extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleExistingClick = () => {
    this.setState({displayPreview: !this.state.displayPreview});
  }

  handleBackPress = () => {
    this.props.goBack();
  }

  render() {
    let {stage} = this.props;
    let stage3_text = "One last thing before we log you in. We would like to know if you want to customize your dashboard or if you would like to use our existing template?";
    let stage4_text = "Thank you! You can always customize your dashboard later, but for now click below to get started, or go back if you change your mind.";
    
    return (
      <div>
        <h1 className="login__text">{`Hi ${this.props.user}`}</h1>

        <p className="getstarted__text">
          {stage === 3 ? stage3_text : stage4_text}
        </p>

        {stage === 3 ?
          <div className="getstarted__buttons">
            <button className="getstarted__button getstarted__button--left">Customize</button>
            <button className={cx("getstarted__button getstarted__button--right", {
              "getstarted__button--active": this.state.displayPreview 
            })} onClick={this.handleExistingClick}>Existing</button>
          </div>
        : null}

        {stage === 3 && this.state.displayPreview ? 
          <div className="getstarted__preview-container">
            <div className="getstarted__preview-inner">
              <p className="getstarted__preview-text">Existing Dashboard Preview.</p>
            </div>
          </div>
        : null}

        {stage === 4 ?
        <div className="login__start-button-container">
          <div className="login__start-button-inner">
            <img src={arrow} className="login__arrow" height="42" width="42" onClick={this.handleBackPress}/>
            <button className="login__button login__button--start">
              <div className="login__button--text" onClick={this.handleNext}>Get Started</div>
            </button>
          </div>
        </div>
        : null}

      </div>
    );
  }
}

export default GetStartedForm;