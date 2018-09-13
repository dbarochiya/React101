import React, { Component } from "react";

class Counter extends Component {
  render() {
    return (
      <div>
        <span
          className={
            this.props.counter.value
              ? "badge m-2 badge-primary"
              : "badge m-2 badge-warning"
          }
        >
          {this.props.counter.value ? this.props.counter.value : "Zero"}
        </span>
        <button
          onClick={() => this.props.onIncrement(this.props.counter)}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
        <button
          onClick={() => this.props.onDecrement(this.props.counter)}
          className="btn btn-secondary btn-sm m-2"
        >
          Decrement
        </button>
        <button
          onClick={() => this.props.onDelete(this.props.counter.id)}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>
      </div>
    );
  }
}

export default Counter;
