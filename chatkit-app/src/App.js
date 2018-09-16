import React, { Component } from "react";
import LoginForm from "./components/login";
import ChatScreen from "./components/chatscreen";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUsername: "",
      currentScreen: "loginScreen"
    };
  }

  onUsernameSubmit = username => {
    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username })
    })
      .then(response => {
        this.setState({
          currentUsername: username,
          currentScreen: "ChatScreen"
        });
      })
      .catch(err => console.error("fetch error", err));
  };

  render() {
    if (this.state.currentScreen === "loginScreen") {
      return <LoginForm onSubmit={this.onUsernameSubmit} />;
    }
    if (this.state.currentScreen === "ChatScreen") {
      return <ChatScreen currentUsername={this.state.currentUsername} />;
    }
  }
}

export default App;
