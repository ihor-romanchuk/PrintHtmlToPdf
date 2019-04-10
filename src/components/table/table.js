import React, { Component } from "react";
import Header from "../header/header";
import Contacts from "../contacts/contacts";
import AdditionalInfo from "../additionalInfo/additionalInfo";
import Paging from "../paging/paging";
import "./table.scss";

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0
    };
  }

  render() {
    let contactsData = Object.assign({}, this.props.contactsData, {
      setHeight: newHeight => {
        this.setState({ height: newHeight });
      }
    });

    return (
      <div className="table-section">
        <table>
          <thead>
            <tr>
              <td colSpan={this.props.tableData.columns.length}>
                <Header {...this.props.headerData} />
              </td>
            </tr>
            <ColumnsList columns={this.props.tableData.columns} />
            <tr>
              <td />
              <td
                className="continue-table"
                colSpan={this.props.tableData.columns.length - 1}
              >
                <i>{this.props.tableData.continueTableText}</i>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr
              style={{ height: this.state.height }}
              className="header-overlay"
            >
              <td colSpan={this.props.tableData.columns.length}>
                <Contacts {...contactsData} />
              </td>
            </tr>
            <tr>
              <td colSpan={this.props.tableData.columns.length}>
                <AdditionalInfo {...this.props.additionalInfoData} />
              </td>
            </tr>
            <ColumnsList columns={this.props.tableData.columns} />
            {this.props.tableData.rows.map((row, index) => {
              return (
                <tr key={index}>
                  {row.map((cell, index) => {
                    let bottomBorder = "<div class='bottom-border'></div>";

                    return (
                      <td
                        key={index}
                        dangerouslySetInnerHTML={{
                          __html: cell + bottomBorder
                        }}
                      />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td
                className="paging-placeholder"
                colSpan={this.props.tableData.columns.length}
              />
            </tr>
          </tfoot>
        </table>
        <Paging totalPages={this.props.totalPages} />
      </div>
    );
  }
}

const ColumnsList = props => {
    return (
      <tr className="columns-list">
        {props.columns.map((column, index) => {
          return <td key={index} dangerouslySetInnerHTML={{ __html: column }} />;
        })}
      </tr>
    );
  };

export default Table