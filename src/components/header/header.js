import React, { Component } from "react";
import "./header.scss";

class Header extends Component {
  render() {
    let borderStyle = `2px solid ${this.props.tableColor}`;

    return (
      <div className="header-section">
        <div className="logo-block">
          <img src={this.props.logoSrc} className="logo" alt="" />
          <div className="address">
            {this.props.address1} {this.props.address2} {this.props.city}, {this.props.state}{" "}
            {this.props.postalCode}
          </div>
        </div>
        <div className="reference-box"
             style={{border: borderStyle}}>
          <div
            className="title"
            style={{ color: this.props.referenceInfo.titleFontColor }}
          >
            {this.props.referenceInfo.title} {this.props.referenceInfo.number}
          </div>
          {this.props.referenceInfo.info.map((p, index) => {
            return (
              <div key={index}>
                {p.title && <span>{p.title}</span>}
                {p.value && <span>{p.value}</span>}
              </div>
            );
          })}
          <div className="amount-block">
            <div className="amount button" style={{ backgroundColor: this.props.tableColor }}>
              <span>{this.props.referenceInfo.amount.title}</span>
              <span>{this.props.referenceInfo.amount.value}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
