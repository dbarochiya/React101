import React from "react";
import RoomList from "./components/roomlist";
import MessageList from "./components/messagelist";
import SendMessageForm from "./components/sendmessageform";
import NewRoomForm from "./components/newroomform";
import Chatkit from "@pusher/chatkit";
import { tokenUrl, instanceLocator } from "./config.js";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    };
  }

  componentDidMount() {
    const tokenProvider = new Chatkit.TokenProvider({
      url: tokenUrl
    });

    const chatManager = new Chatkit.ChatManager({
      instanceLocator: instanceLocator,
      userId: "robo",
      tokenProvider: tokenProvider
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.getRooms();
        this.subscibeToRoom();
      })
      .catch(err => console.log("error on connecting: ", err));
  }

  subscribeToRoom = roomId => {
    this.setState({ messages: [] });
    this.currentUser
      .subscribeToRoom({
        roomId: roomId,
        hooks: {
          onNewMessage: message => {
            // console.log(`Received new message: ${message.text}`);
            this.setState({ messages: [...this.state.messages, message] });
          }
        }
      })
      .then(room => {
        this.setState({
          roomId: room.id
        });
        this.getRooms();
      })
      .catch(err => console.log("err on subscribing room", err));
  };

  getRooms = () => {
    this.currentUser
      .getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        });
        // console.log("joinable", this.state.joinableRooms);
        // console.log("joined", this.state.joinedRooms);
      })
      .catch(err => console.log("error on joinableRooms: ", err));
  };

  sendMessage = m => {
    this.currentUser.sendMessage({
      text: m,
      roomId: this.state.roomId
    });
  };

  createRoom = roomName => {
    //console.log(roomName);
    this.currentUser
      .createRoom({
        name: roomName
      })
      .then(room => this.subscribeToRoom(room.id))
      .catch(err => console.log("error with creteting room", err));
  };

  render() {
    return (
      <div className="app">
        <RoomList
          onSubscribeToRoom={this.subscribeToRoom}
          rooms={[...this.state.joinedRooms, ...this.state.joinableRooms]}
          roomId={this.state.roomId}
        />
        <MessageList
          roomId={this.state.roomId}
          messages={this.state.messages}
        />
        <SendMessageForm
          disabled={!this.state.roomId}
          doSendMessage={this.sendMessage}
        />
        <NewRoomForm doCreateRoom={this.createRoom} />
      </div>
    );
  }
}

export default App;
