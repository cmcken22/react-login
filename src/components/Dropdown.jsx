import React from 'react';
import cx from 'classnames';

class Dropdown extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      activeElement: null,
      activeIndex: null
    }
  }
  
  handleClick = (item) => {
    this.setState({activeElement: item});
    this.props.onSelect(item);
  }

  onMouseEnter = (i) => {
    this.setState({activeIndex: i});
  }
  
  onMouseLeave = () => {
    this.setState({activeIndex: null});
  }

  render() {
    return (
      <div className="dropdown__container">
        <div className="dropdown__header">
          <p className="dropdown__header--text">{this.props.title}</p>
        </div>
        <div className="dropdown__list">
          {this.props.listItems.map((item, i) =>   
            <div 
              key={item} 
              className="dropdown__list-item"
              onClick={() => this.handleClick(item)} 
              onMouseEnter={() => this.onMouseEnter(i)} 
              onMouseLeave={() => this.onMouseLeave(i)}
            >
              <div className="dropdown__list-item__bullet">
                <svg height="20" width="20">
                  <circle cx="10" cy="11" r="4" className={cx("dropdown__list-item__bullet__circle", {
                    "dropdown__list-item__bullet__circle--solid": this.state.activeIndex === i || this.state.activeElement === item
                  })}/>
                </svg>
              </div>
              <div className="dropdown__list-item__content">
                <p>{item}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Dropdown;