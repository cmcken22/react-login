import React from 'react';

class SignUp extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleSubmit = () => {
    console.log('enter', this.userName.value, this.password.value);
  }

  handleClickhere = () => {
    this.props.toggleLogin(true);
  }

  render() {
    return (
      <div className="login">
        <h1 className="login__text">SignUp</h1>
        <input className="login__input login__input--small login__input--left" placeholder="first name" ref={r => this.firstName = r}/>
        <input className="login__input login__input--small login__input--right" placeholder="last name" ref={r => this.lastName = r}/>
        <input className="login__input" placeholder="email" ref={r => this.email = r}/><br/>
        <input className="login__input" placeholder="company" ref={r => this.company = r}/><br/>
        <input className="login__input" placeholder="role" ref={r => this.role = r}/><br/>
        <button className="login__button">
          <div className="Login__button--text" onClick={this.handleSubmit}>Enter</div>
        </button>
        <p className="login__bottom-text">If you have an account, please <a onClick={this.handleClickhere}>click here</a> to Log in</p>
      </div>
    );
  }
}

export default SignUp;