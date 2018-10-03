import React, { Component } from "react";
import "./App.css";
import TaskList from "./task-list";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      taskname: ""
    };
  }

  addTask = e => {
    if (this._inputElement.value !== "") {
      var newTask = {
        text: this._inputElement.value,
        key: Date.now()
      };

      this.setState(prevState => {
        return {
          tasks: prevState.tasks.concat(newTask)
        };
      });

      this._inputElement.value = "";
    }
    e.preventDefault();
  };

  deleteTask = key => {
    let newTasks = this.state.tasks.filter(task => {
      return task.key !== key;
    });

    this.setState({
      tasks: newTasks
    });
  };
  render() {
    return (
      <div className="App">
        <div className="header">
          <form onSubmit={this.addTask}>
            <input
              type="text"
              placeholder="so..what next?"
              ref={a => (this._inputElement = a)}
            />
            <button type="submit">add</button>
          </form>
          <TaskList tasklist={this.state.tasks} delete={this.deleteTask} />
        </div>
      </div>
    );
  }
}

export default App;
