import React from "react";
import RoomList from "./roomlist";
import MessageList from "./messagelist";
import SendMessageForm from "./sendmessageform";
import Profile from "./profile";
import OnlineUsers from "./onlineUsers";
import NewRoomForm from "./newroomform";
import Chatkit from "@pusher/chatkit";

class ChatScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      roomId: null,
      onlineUsers: [],
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    };
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: "v1:us1:97084d20-4488-413b-9650-fbe5ef97e2ba",
      userId: this.props.currentUsername,
      tokenProvider: new Chatkit.TokenProvider({
        url:
          "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/97084d20-4488-413b-9650-fbe5ef97e2ba/token"
      })
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.getRooms();
        if (this.state.roomId !== null) this.subscribeToRoom(this.state.roomId);
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
          },
          userStartedTyping: user => {
            this.setState({
              usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
            });
          },
          userStoppedTyping: user => {
            this.setState({
              usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                username => username !== user.name
              )
            });
          },

          onUserCameOnline: () => this.forceUpdate(),
          onUserWentOffline: () => this.forceUpdate(),
          onUserJoined: () => this.forceUpdate()
        }
      })
      .then(room => {
        this.setState({
          roomId: room.id,
          onlineUsers: room.users
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
    //console.log(this.state);
    return (
      <div className="app">
        <Profile />
        <OnlineUsers users={this.state.onlineUsers} />
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

export default ChatScreen;
