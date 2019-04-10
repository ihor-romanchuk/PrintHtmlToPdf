import React, { Component } from "react";
import "./paging.scss";

class Paging extends Component {
  render() {
    return (
      <div className="paging-container">
        {Array.from({ length: this.props.totalPages }, (_, index) => {
          let bottomStyle = "calc(" + -index * 100 + "vh + 15px)";
          return (
            <span
              key={index}
              style={{ bottom: bottomStyle }}
              className="paging-item"
            >
              Page {index + 1} of {this.props.totalPages}
            </span>
          );
        })}
      </div>
    );
  }
}

export default Paging
