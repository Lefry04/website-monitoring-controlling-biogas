import React from "react";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return (
      <div className="flex items-center gap-4">
        <h1>{this.state.count}</h1>
        <button className="bg-black text-white w-4 px-6 py-3 flex justify-center"
        onClick={() => this.setState({ count: this.state.count + 1 })}
        >+</button>
      </div>
    );
  }
}

export default Counter;