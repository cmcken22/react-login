import React from 'react';
import cx from 'classnames';

class Modal extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  handleExit = () => {
    this.props.closeModal();
  }

  render() {
    let {className} = this.props;

    return (
      <div className={cx("modal", {
        [className]: className
      })}>
        <div className="modal__overlay" onClick={this.handleExit}></div>
        <div className="modal__header">
          <h1>{this.props.title}</h1>
        </div>
        <div className="modal__content">
          <div className="modal__content--inner">
            {this.props.content}
            {this.props.footer}
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;