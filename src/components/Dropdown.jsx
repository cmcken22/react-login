import React from 'react';
import cx from 'classnames';

class Dropdown extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      activeElement: null
    }
  }
  
  handleClick = (item) => {
    this.setState({activeElement: item});
    this.props.onSelect(item);
  }

  render() {
    return (
      <div className="dropdown__container">
        <div className="dropdown__header">
          <p className="dropdown__header--text">Please select a role.</p>
        </div>
        <div className="dropdown__list">
          <ul>
            {this.props.listItems.map(item => 
              <li 
                value={item}
                key={`list__${item}`}
                onClick={() => {this.handleClick(item)}}
                className={cx({"dropdown__list--active": this.state.activeElement === item})}
              >
              <p className="dropdown__list--text">
                {item}
              </p>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default Dropdown;