import React from 'react';
import PropTypes from 'prop-types';

class UserStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'Fetching user status...',
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ status: 'Active User' });
    }, 2000);
  }

  render() {
    return (
      <div style={{ padding: '10px', border: '1px solid #ccc', margin: '10px', backgroundColor: '#f0f0f0' }}>
        User ID: {this.props.userId}
        <br />
        {this.state.status}
      </div>
    );
  }
}

UserStatus.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default UserStatus;
