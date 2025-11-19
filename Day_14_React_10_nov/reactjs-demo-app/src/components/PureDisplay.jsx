import React from 'react';

class PureDisplay extends React.PureComponent {
  render() {
    console.log('PureDisplay rendered');
    const { title, count } = this.props;
    return (
      <div>
        <h4>{title}</h4>
        <p>Count: {count}</p>
      </div>
    );
  }
}

export default PureDisplay;
