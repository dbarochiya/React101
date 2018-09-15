import React, { Component } from "react";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
  }

  onChange = e => {
    this.setState({ username: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.username);
  };
  render() {
    return (
      <div>
        <h2>What is your username?</h2>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Your full name"
            onChange={this.onChange}
            value={this.state.username}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default LoginForm;
