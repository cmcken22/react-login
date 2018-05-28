import React from 'react';
import openEye from'../assets/openEye.png';
import closedEye from'../assets/closedEye.png';

class PasswordInput extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      open: true
    }
  }

  renderEye = (open) => {
    let eye = open ? openEye : closedEye;
    return(
      <img className="passwordInput__eye" src={eye} onClick={this.handleClick}/>
    );
  }

  handleClick = () => {
    this.setState({open: !this.state.open});
  }

  render() {
    const id = this.props.id || "password";
    const placeholder = this.props.placeholder || "password";

    return (
      <div className="passwordInput__container" ref={r => this.containerRef = r}>
        <div className="passwordInput__inner">
          
          <input className="passwordInput__input" type={this.state.open ? "password" : "text"} id={id} placeholder={placeholder}/>
          {this.renderEye(this.state.open)}
        </div>
      </div>
    );
  }
}

export default PasswordInput;