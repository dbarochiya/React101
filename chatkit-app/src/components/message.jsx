import React from "react";

const Message = props => {
  return (
    <div className="message">
      <div className="message-username">{props.message.senderId}</div>
      <div className="message-text">{props.message.text}</div>
    </div>
  );
};

export default Message;
