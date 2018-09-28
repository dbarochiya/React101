import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

class OnlineUsers extends Component {
  state = {};

  renderUsers() {
    // console.log(this.props.users);
    return (
      <div className="online-users">
        <ul className="online-users-list">
          {this.props.users.map((user, index) => {
            return (
              <Item key={index} presenceState={user.presence.state}>
                {user.name}
              </Item>
            );
          })}
        </ul>
      </div>
    );
  }

  render() {
    if (this.props.users) {
      return this.renderUsers();
    } else {
      return <p>Loading...</p>;
    }
  }
}

const styles = {
  row: {
    display: "flex",
    justifyContent: "center"
  },
  avatar: {
    margin: 10
  },
  bigAvatar: {
    width: 60,
    height: 60
  }
};

class Item extends Component {
  render() {
    return (
      <div className={classes.row}>
        <Avatar
          alt="Remy Sharp"
          src="/static/images/remy.jpg"
          className={classes.avatar}
        />
        <Avatar
          alt="Adelle Charles"
          src="/static/images/uxceo-128.jpg"
          className={classNames(classes.avatar, classes.bigAvatar)}
        />
      </div>
    );
  }
}

export default OnlineUsers;
