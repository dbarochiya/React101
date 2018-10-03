import React, { Component } from "react";
import FlipMove from "react-flip-move";
class TaskList extends Component {
  delete = key => {
    this.props.delete(key);
  };
  render() {
    console.log(this.props.tasklist);
    return (
      <ul className="theList">
        <FlipMove duration={250} easing="ease-out">
          {this.props.tasklist.map(task => {
            return (
              <li key={task.key} onClick={() => this.props.delete(task.key)}>
                {task.text}
              </li>
            );
          })}
        </FlipMove>
      </ul>
    );
  }
}

export default TaskList;
