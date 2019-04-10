import React, { Component } from "react";
import "./additionalInfo.scss";

class AdditionalInfo extends Component {
  render() {
    return (
      <div className="additional-info-section">
        {this.props.items.map((item, index) => {
          return (
            <div key={index}>
              <div className="title-wrapper">
                <span className="title" style={{ color: this.props.titleFontColor }}>
                  {item.title}
                </span>
              </div>
              <div
                className="text"
                dangerouslySetInnerHTML={{ __html: item.text }}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default AdditionalInfo;
