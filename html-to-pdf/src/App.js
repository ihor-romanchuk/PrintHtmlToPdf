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

      },
      additionalInfoData: {

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
        <div class="main-container">
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
    <div>Contacts goes here</div>
  );
};

const AdditionalInfo = props => {
  return (
    <div>AdditionalInfo goes here</div>
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
