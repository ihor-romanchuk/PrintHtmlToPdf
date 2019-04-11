import React, { Component } from "react";
import "./footer.scss";

class Footer extends Component {
  render() {
    return (
      <div
        className={`footer-section ${
          this.props.isSplitted ? "with-background" : ""
        }`}
      >
        <div className="fixed-content">
          <div className="footer-title">{this.props.infoTitle}</div>
          <div className="footer-body">
            <div className="payment-options-block">
              <div className="payment-title button" style={{backgroundColor: this.props.tableColor}}>
                {this.props.paymentOptions.paymentTitle}
              </div>
              <div className="options-wrapper">
                <div
                  className="payment-text"
                  dangerouslySetInnerHTML={{
                    __html: this.props.paymentOptions.paymentText
                  }}
                />
                {this.props.paymentOptions.options.map((option, index) => {
                  return (
                    <div key={index} className="payment-option">
                      <span
                        className={option.isTitleHighlighted && "title"}
                        style={
                          option.isTitleHighlighted
                            ? { color: this.props.titleFontColor }
                            : {}
                        }
                      >
                        {option.title}
                      </span>
                      <span
                        className={option.isValueHighlighted && "text-bold"}
                      >
                        {option.value}
                      </span>
                    </div>
                  );
                })}
                <div className="special-option">
                  <div
                    className="title"
                    dangerouslySetInnerHTML={{
                      __html: this.props.paymentOptions.specialOption.title
                    }}
                  />
                  <div
                    className="description"
                    dangerouslySetInnerHTML={{
                      __html: this.props.paymentOptions.specialOption.value
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="payment-summary-block">
              <div className="summary-wrapper">
                {this.props.paymentSummary.referenceInfo.map((item, index) => {
                  return (
                    <div key={index} className="info-item">
                      <span>{item.title}</span>
                      <span>{item.value}</span>
                    </div>
                  );
                })}
              </div>
              <div
                className="payment-request"
                dangerouslySetInnerHTML={{
                  __html: this.props.paymentSummary.paymentRequestHtml
                }}
              />
              <div className="client">
                <div className="name">
                  {this.props.paymentSummary.client.name}
                </div>
                <div>
                  {this.props.paymentSummary.client.address1}{" "}
                  {this.props.paymentSummary.client.address2}
                </div>
                <div>
                  {this.props.paymentSummary.client.city},{" "}
                  {this.props.paymentSummary.client.state}{" "}
                  {this.props.paymentSummary.client.postalCode}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;