import React, { Component } from "react";
import "./contacts.scss";

class Contacts extends Component {
  componentDidMount() {
    var style = window.getComputedStyle(
      document.querySelector(".contacts-section"),
      null
    );
    const height =
      style.getPropertyValue("height").replace("px", "") -
      style.getPropertyValue("padding-top").replace("px", "") -
      style.getPropertyValue("padding-bottom").replace("px", "");
    this.props.setHeight(height);
  }

  render() {
    return (
      <div className="contacts-section">
        <div className="contact-info-wrapper">
          <div className="info">
            <div>{this.props.contactInfo.name}</div>
            <div>
              {this.props.contactInfo.address1}{" "}
              {this.props.contactInfo.address2}
            </div>
            <div>
              {this.props.contactInfo.city}, {this.props.contactInfo.state}{" "}
              {this.props.contactInfo.postalCode}
            </div>
          </div>
        </div>
        <div className="options">
          {this.props.contactOptions.map((option, index) => {
            return (
              <div key={index} className="option">
                <div className="icon-wrapper">
                  {option.imageSrc && <img src={option.imageSrc} alt="" />}
                </div>
                <div className="info-wrapper">
                  <div className="title-wrapper">
                    <span
                      className="title"
                      style={{ color: this.props.titleFontColor }}
                    >
                      {option.title}
                    </span>
                    {option.value && (
                      <span className="value">{option.value}</span>
                    )}
                  </div>
                  {option.description && (
                    <div className="description">{option.description}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Contacts;