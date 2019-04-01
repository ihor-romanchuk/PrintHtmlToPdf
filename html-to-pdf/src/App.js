import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';

class App extends Component {
  mapData(data) {
    return {
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
              value: data.texts.value5english1
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
            imageSrc: "moneyIcon.png",
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
      tableHeaderData: {

      },
      tableData: {
        items: [

        ]
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
              value: data.texts.value5english1
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

  render() {
    let data = this.mapData(window.data);

    return (
      <div className="app">
        <div className="main-container">
          <Header {...data.headerData}></Header>
          <Contacts {...data.contactsData}></Contacts>
          <AdditionalInfo {...data.additionalInfoData}></AdditionalInfo>
          <Table header={data.tableHeaderData} data={data.tableData}></Table>
          <Footer {...data.footerData}></Footer>
        </div>
      </div>
    );
  }
}

const Header = props => {
  return (
    <div className="header-section">
      <div className="logo-block">
        <img src={props.logoSrc} className="logo"></img>
        <div className="address">{props.address1} {props.address2} {props.city}, {props.state} {props.postalCode}</div>
      </div>
      <div className="reference-box">
        <div className="title" style={{ color: props.referenceInfo.titleFontColor }}>{props.referenceInfo.title} {props.referenceInfo.number}</div>
        {props.referenceInfo.info.map(p => {
          return (
            <div>
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

const Contacts = props => {
  return (
    <div className="contacts-section">
      <div className="contact-info-wrapper">
        <div className="info">
          <div>{props.contactInfo.name}</div>
          <div>{props.contactInfo.address1} {props.contactInfo.address2}</div>
          <div>{props.contactInfo.city}, {props.contactInfo.state} {props.contactInfo.postalCode}</div>
        </div>
      </div>
      <div className="options">
        {props.contactOptions.map(option => {
          return (
            <div className="option">
              <div className="icon-wrapper">
                {option.imageSrc && <img src={option.imageSrc} />}
              </div>
              <div className="info-wrapper">
                <div className="title-wrapper">
                  <span className="title" style={{ color: props.titleFontColor }}>{option.title}</span>
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
};

const AdditionalInfo = props => {
  return (
    <div className="additional-info-section">
      {props.items.map(item => {
        return (
          <div>
            <div className="title-wrapper">
              <span className="title" style={{ color: props.titleFontColor }}>{item.title}</span>
            </div>
            <div className="text">{item.text}</div>
          </div>
        );
      })}
    </div>
  );
};

const TableHeader = props => {
  return (
    <div>
      <div>TableHeader goes here</div>
      <div>table continues here text (DO NOT FORGET!)</div>
    </div>
  );
};

const TableItem = props => {
  return (
    <div className="table-item">TableItem goes here</div>
  );
};

const Table = props => {
  return (
    <div className="table">
      <TableHeader {...props.header}></TableHeader>
      {props.data.items.map(item => {
        return (
          <TableItem {...item}></TableItem>
        );
      })
      }
    </div>
  );
};

const Footer = props => {
  return (
    <div className="footer-section">
      <div className="footer-title">{props.infoTitle}</div>
      <div className="footer-body">
        <div className="payment-options-block">
          <div className="payment-title button-blue">{props.paymentOptions.paymentTitle}</div>
          <div className="options-wrapper">
            <div className="payment-text" dangerouslySetInnerHTML={{ __html: props.paymentOptions.paymentText }}></div>
            {props.paymentOptions.options.map(option => {
              return (
                <div className="payment-option">
                  <span className={option.isTitleHighlighted && "title"} style={option.isTitleHighlighted ? { color: props.titleFontColor } : {}}>{option.title}</span>
                  <span className={option.isValueHighlighted && "text-bold"}>{option.value}</span>
                </div>
              );
            })}
            <div className="special-option">
              <div className="title" dangerouslySetInnerHTML={{ __html: props.paymentOptions.specialOption.title }}></div>
              <div className="description" dangerouslySetInnerHTML={{ __html: props.paymentOptions.specialOption.value }}></div>
            </div>
          </div>
        </div>
        <div className="payment-summary-block">
          <div className="summary-wrapper">
            {props.paymentSummary.referenceInfo.map(item => {
              return (
                <div className="info-item">
                  <span>{item.title}</span>
                  <span>{item.value}</span>
                </div>
              );
            })}
          </div>
          <div className="payment-request" dangerouslySetInnerHTML={{ __html: props.paymentSummary.paymentRequestHtml }}></div>
          <div className="client">
            <div className="name">{props.paymentSummary.client.name}</div>
            <div>{props.paymentSummary.client.address1} {props.paymentSummary.client.address2}</div>
            <div>{props.paymentSummary.client.city}, {props.paymentSummary.client.state} {props.paymentSummary.client.postalCode}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
