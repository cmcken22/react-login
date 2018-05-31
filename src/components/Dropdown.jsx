import React from 'react';
import cx from 'classnames';

class Dropdown extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      activeElement: null,
      activeIndex: null,
      activeElements: []
    }
  }
  
  handleClick = (i, item) => {
    if(this.props.selectMultiple) {
      if(this.state.activeElements.indexOf(i) === -1) {
        this.setState(prevState => ({
          activeElements: [...prevState.activeElements, i]
        }));
        this.props.onSelect(item);
      } else {
        let array = this.state.activeElements;
        let index = this.state.activeElements.indexOf(i);
        array.splice(index, 1);
        this.setState({activeElements: array});
        this.props.onSelect(item, true);
      }
    } else {
      this.setState({activeElement: item.title});
      this.props.onSelect(item);
    }
  }

  onMouseEnter = (i) => {
    this.setState({activeIndex: i});
  }
  
  onMouseLeave = () => {
    this.setState({activeIndex: null})
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
              key={item.title} 
              className="dropdown__list-item"
              onClick={() => this.handleClick(i, item)} 
              onMouseEnter={() => this.onMouseEnter(i)} 
              onMouseLeave={() => this.onMouseLeave(i)}
            >
              <div className="dropdown__list-item__bullet">
                <svg height="20" width="20">
                  <circle cx="10" cy="11" r="4" className={cx("dropdown__list-item__bullet__circle", {
                    "dropdown__list-item__bullet__circle--solid": 
                      this.state.activeIndex === i || this.state.activeElement === item.title || this.state.activeElements.indexOf(i) !== -1
                  })}/>
                </svg>
              </div>
              <div className="dropdown__list-item__content">
                <p>{item.title}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Dropdown;