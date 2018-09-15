import React from "react";

class NewRoomForm extends React.Component {
  state = {
    roomName: ""
  };

  handleChange = e => {
    this.setState({
      roomName: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.doCreateRoom(this.state.roomName);
    this.setState({ roomName: "" });
  };

  render() {
    return (
      <div className="new-room-form">
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            value={this.state.roomName}
            type="text"
            placeholder="new room name"
            required
          />
          <button id="create-room-btn" type="submit">
            +
          </button>
        </form>
      </div>
    );
  }
}

export default NewRoomForm;
