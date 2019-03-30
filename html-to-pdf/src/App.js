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
          <div className="amount">
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
    <div className="footer">Footer goes here</div>
  );
};

export default App;
