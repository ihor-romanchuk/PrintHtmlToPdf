import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalPages: 1,
      isFooterSplittedBeetwenPages: false
    };
  }

  mapData(data) {
    return {
      font: data.font,
      headerData: {
        logoSrc: data.logo,
        address1: data.client.address1,
        address2: data.client.address2,
        city: data.client.city,
        state: data.client.state,
        postalCode: data.client.postalcode,
        referenceInfo: {
          title: data.headers.header1english,
          number: data.texts.value1english,
          titleFontColor: data.fontcolor,
          info: [
            {
              title: data.headers.header2english,
              value: data.texts.value2english
            },
            {
              title: data.headers.header3english,
              value: data.texts.value3english
            },
            {
              title: data.headers.header6english,
              value: data.texts.value6english
            },
            {
              title: data.headers.header5english,
              value: data.texts.value5english1 + " " + data.texts.value5english2
            }
          ],
          amount: {
            title: data.headers.header7english,
            value: data.service.total
          }
        }
      },
      contactsData: {
        contactInfo: {
          name: data.contact.name,
          address1: data.contact.address1,
          address2: data.contact.address2,
          city: data.contact.city,
          state: data.contact.state,
          postalCode: data.contact.postalcode
        },
        titleFontColor: data.fontcolor,
        contactOptions: [
          {
            imageSrc: "messageIcon.png",
            title: data.headers.header8english,
            description: data.texts.value8english
          }, {
            title: data.headers.header9english,
            value: data.texts.value9english1,
            description: data.texts.value9english2
          }, {
            imageSrc: "dollarIcon.png",
            title: data.headers.header13english,
            description: data.texts.value13english
          }, {
            title: data.headers.header4english,
            value: data.texts.value4english
          }
        ]
      },
      additionalInfoData: {
        titleFontColor: data.fontcolor,
        items: [
          {
            title: data.headers.header10english,
            text: data.texts.bodyenglish
          },
          {
            title: data.headers.header11english,
            text: data.texts.bodyotherenglish
          }
        ]
      },
      tableData: {
        columns: data.tableenglish.columns,
        rows: data.tableenglish.rows,
        continueTableText: "continued from previous page..."
      },
      footerData: {
        infoTitle: data.texts.couponenglish,
        titleFontColor: data.fontcolor,
        paymentOptions: {
          paymentTitle: data.headers.header12english,
          paymentText: data.texts.payment1english,
          options: [
            {
              title: data.headers.header16english,
              value: data.texts.value16english,
              isTitleHighlighted: true
            },
            {
              title: data.headers.header17english,
              value: data.texts.value17english,
              isTitleHighlighted: true,
              isValueHighlighted: true
            },
            {
              title: data.headers.header14english,
              value: data.texts.value14english
            }
          ],
          specialOption: {
            title: data.headers.header15english,
            value: data.texts.payment2english
          }
        },
        paymentSummary: {
          referenceInfo: [
            {
              title: data.headers.header1english,
              value: data.texts.value1english
            },
            {
              title: data.headers.header3english,
              value: data.texts.value3english
            },
            {
              title: data.headers.header6english,
              value: data.texts.value6english
            },
            {
              title: data.headers.header5english,
              value: data.texts.value5english1 + " " + data.texts.value5english2
            },
            {
              title: data.headers.header7english,
              value: data.service.total
            }
          ],
          paymentRequestHtml: data.texts.payment3english,
          client: {
            name: data.client.returnname,
            address1: data.client.address1,
            address2: data.client.address2,
            city: data.client.city,
            state: data.client.state,
            postalCode: data.client.postalcode
          }
        }
      }
    };
  }

  performPrintRelatedCalculations() {
    const pagingHeight = 45;
    const headerHeight = 235;
    const footerMargin = 85;
    const overhead = 0;

    let initialContentHeight = document.querySelector(".main-container").offsetHeight - pagingHeight;
    let footerSectionHeight = document.querySelector(".footer-section").offsetHeight;
    let viewportHeight = window.innerHeight;

    let pendingTotalPages;
    let totalHeight;
    let totalPages = 1;

    do {
      pendingTotalPages = totalPages;
      totalHeight = initialContentHeight + footerMargin + (pendingTotalPages - 1) * (headerHeight + pagingHeight + overhead);//should differ on initial step as footerMargin is only on last page
      totalPages = Math.ceil(totalHeight / viewportHeight);
    }
    while (totalPages !== pendingTotalPages);
    debugger;
    let isFooterSplittedBeetwenPages = totalHeight - (footerSectionHeight + footerMargin + pagingHeight) < (totalPages - 1) * viewportHeight; //smth wrong here
    
    return {
      totalPages: totalPages,
      isFooterSplittedBeetwenPages: isFooterSplittedBeetwenPages
    };
  };

  componentDidMount() {
    let printRelatedCalculations = this.performPrintRelatedCalculations()
    this.setState({
      totalPages: printRelatedCalculations.totalPages,
      isFooterSplittedBeetwenPages: printRelatedCalculations.isFooterSplittedBeetwenPages
    });
  }

  render() {
    let data = this.mapData(window.data);

    return (
      <div style={{fontFamily: data.font}} className="app">
        <div className="main-container">
          <Table headerData={data.headerData}
            contactsData={data.contactsData}
            additionalInfoData={data.additionalInfoData}
            tableData={data.tableData}
            totalPages={this.state.totalPages}></Table>
          <Footer {...data.footerData} isSplitted={this.state.isFooterSplittedBeetwenPages}></Footer>
        </div>
      </div>
    );
  }
}

const Header = props => {
  return (
    <div className="header-section">
      <div className="logo-block">
        <img src={props.logoSrc} className="logo" alt=""></img>
        <div className="address">{props.address1} {props.address2} {props.city}, {props.state} {props.postalCode}</div>
      </div>
      <div className="reference-box">
        <div className="title" style={{ color: props.referenceInfo.titleFontColor }}>{props.referenceInfo.title} {props.referenceInfo.number}</div>
        {props.referenceInfo.info.map((p, index) => {
          return (
            <div key={index}>
              {p.title && <span>{p.title}</span>}
              {p.value && <span>{p.value}</span>}
            </div>
          );
        })}
        <div className="amount-block">
          <div className="amount button-blue">
            <span>{props.referenceInfo.amount.title}</span>
            <span>{props.referenceInfo.amount.value}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

class Contacts extends Component {
  componentDidMount() {
    var style = window.getComputedStyle(document.querySelector(".contacts-section"), null);
    const height = style.getPropertyValue("height").replace("px", "") - style.getPropertyValue("padding-top").replace("px", "") - style.getPropertyValue("padding-bottom").replace("px", "");
    this.props.setHeight(height);
  }

  render() {
    return (
      <div className="contacts-section">
        <div className="contact-info-wrapper">
          <div className="info">
            <div>{this.props.contactInfo.name}</div>
            <div>{this.props.contactInfo.address1} {this.props.contactInfo.address2}</div>
            <div>{this.props.contactInfo.city}, {this.props.contactInfo.state} {this.props.contactInfo.postalCode}</div>
          </div>
        </div>
        <div className="options">
          {this.props.contactOptions.map((option, index) => {
            return (
              <div key={index} className="option">
                <div className="icon-wrapper">
                  {option.imageSrc && <img src={option.imageSrc} alt=""/>}
                </div>
                <div className="info-wrapper">
                  <div className="title-wrapper">
                    <span className="title" style={{ color: this.props.titleFontColor }}>{option.title}</span>
                    {option.value && <span className="value">{option.value}</span>}
                  </div>
                  {option.description && <div className="description">{option.description}</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

const AdditionalInfo = props => {
  return (
    <div className="additional-info-section">
      {props.items.map((item, index) => {
        return (
          <div key={index}>
            <div className="title-wrapper">
              <span className="title" style={{ color: props.titleFontColor }}>{item.title}</span>
            </div>
            <div className="text" dangerouslySetInnerHTML={{ __html: item.text }}></div>
          </div>
        );
      })}
    </div>
  );
};

const ColumnsList = props => {
  return (
    <tr className="columns-list">
      {props.columns.map((column, index) => {
        return (
          <td key={index} dangerouslySetInnerHTML={{ __html: column }}></td>
        );
      })}
    </tr>
  );
}

class Table extends Component {
  constructor(props) {
    super(props)

    this.state = {
      height: 0
    }
  }

  render() {
    let contactsData = Object.assign({}, this.props.contactsData, { setHeight: (newHeight) => {
      this.setState({height: newHeight});
    } });

    return (
      <div className="table-section">
        <table>
          <thead>
            <tr>
              <td colSpan={this.props.tableData.columns.length}>
                <Header {...this.props.headerData}></Header>
              </td>
            </tr>
            <ColumnsList columns={this.props.tableData.columns}></ColumnsList>
            <tr>
              <td></td>
              <td className="continue-table" colSpan={this.props.tableData.columns.length - 1}>
                <i>{this.props.tableData.continueTableText}</i>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr style={{height: this.state.height}} className="header-overlay">
              <td colSpan={this.props.tableData.columns.length}>
                <Contacts {...contactsData}></Contacts>
              </td>
            </tr>
            <tr>
              <td colSpan={this.props.tableData.columns.length}>
                <AdditionalInfo {...this.props.additionalInfoData}></AdditionalInfo>
              </td>
            </tr>
            <ColumnsList columns={this.props.tableData.columns}></ColumnsList>
            {this.props.tableData.rows.map((row, index) => {
              return (
                <tr key={index}>
                  {row.map((cell, index) => {
                    let bottomBorder = "<div class='bottom-border'></div>";

                    return (
                      <td key={index} dangerouslySetInnerHTML={{ __html: cell + bottomBorder }}></td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td className="paging-placeholder" colSpan={this.props.tableData.columns.length}>
              </td>
            </tr>
          </tfoot>
        </table>
        <Paging totalPages={this.props.totalPages}></Paging>
      </div>
    );
  }
};

class Paging extends Component {
  render() {
    return (
      <div className="paging-container">
        {Array.from({length: this.props.totalPages}, (_, index) => {
          let bottomStyle = "calc(" + (-index * 100) + "vh" + " + 15px)";
          return (
            <span key={index} style={{bottom: bottomStyle}} className="paging-item">Page {index + 1} of {this.props.totalPages}</span>
          );
        })}
      </div>
    );
  }
}

class Footer extends Component {
  render() {
    return (
      <div className={`footer-section ${this.props.isSplitted ? "with-background": ""}`}>
        <div className="fixed-content">
          <div className="footer-title">{this.props.infoTitle}</div>
          <div className="footer-body">
            <div className="payment-options-block">
              <div className="payment-title button-blue">{this.props.paymentOptions.paymentTitle}</div>
              <div className="options-wrapper">
                <div className="payment-text" dangerouslySetInnerHTML={{ __html: this.props.paymentOptions.paymentText }}></div>
                {this.props.paymentOptions.options.map((option, index) => {
                  return (
                    <div key={index} className="payment-option">
                      <span className={option.isTitleHighlighted && "title"} style={option.isTitleHighlighted ? { color: this.props.titleFontColor } : {}}>{option.title}</span>
                      <span className={option.isValueHighlighted && "text-bold"}>{option.value}</span>
                    </div>
                  );
                })}
                <div className="special-option">
                  <div className="title" dangerouslySetInnerHTML={{ __html: this.props.paymentOptions.specialOption.title }}></div>
                  <div className="description" dangerouslySetInnerHTML={{ __html: this.props.paymentOptions.specialOption.value }}></div>
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
              <div className="payment-request" dangerouslySetInnerHTML={{ __html: this.props.paymentSummary.paymentRequestHtml }}></div>
              <div className="client">
                <div className="name">{this.props.paymentSummary.client.name}</div>
                <div>{this.props.paymentSummary.client.address1} {this.props.paymentSummary.client.address2}</div>
                <div>{this.props.paymentSummary.client.city}, {this.props.paymentSummary.client.state} {this.props.paymentSummary.client.postalCode}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
