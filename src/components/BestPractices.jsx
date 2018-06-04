import React from 'react';
import { connect } from 'react-redux';

class BestPractices extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        Best Practices
      </div>
    );
  }
}

export default connect(
  state => {
    return {
    }
  },
  dispatch => {
    return {
    }
  }
)(BestPractices);