import React from 'react';
import cx from 'classnames';

class GetStarted extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      displayPreview: false
    }
  }

  handleExistingClick = () => {
    this.setState({displayPreview: !this.state.displayPreview});
  }

  render() {
    let {stage} = this.props;
    let stage3_text = "One last thing before we log you in. We would like to know if you want to customize your dashboard or if you would like to use our existing template?";
    let stage4_text = "Thank you! You can always customize your dashboard later, but for now click below to get started, or go back if you change your mind.";
   
    return (
      <div className="getstarted__container">
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

      </div>
    );
  }
}

export default GetStarted;