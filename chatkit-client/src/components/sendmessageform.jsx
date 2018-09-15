import React from "react";
class SendMessageForm extends React.Component {
  state = {
    message: ""
  };

  handleChange = e => {
    this.setState({ message: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.doSendMessage(this.state.message);
    this.setState({ message: "" });
  };

  render() {
    // console.log(this.state.message);
    return (
      <form onSubmit={this.handleSubmit} className="send-message-form">
        <input
          disabled={this.props.disabled}
          onChange={this.handleChange}
          value={this.state.message}
          placeholder="type here!"
          type="text"
        />
      </form>
    );
  }
}

export default SendMessageForm;
