import React, { Component } from "react";
import Table from "../table/table";
import Footer from "../footer/footer";
import "./app.scss";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTest: false,
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
          },
          {
            title: data.headers.header9english,
            value: data.texts.value9english1,
            description: data.texts.value9english2
          },
          {
            imageSrc: "dollarIcon.png",
            title: data.headers.header13english,
            description: data.texts.value13english
          },
          {
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
    const pageHeight = 1056;
    const overhead = 9;

    let initialContentHeight =
      document.querySelector(".main-container").offsetHeight - pagingHeight;
    let footerSectionHeight = document.querySelector(".footer-section")
      .offsetHeight;

    let pendingTotalPages;
    let totalHeight = initialContentHeight;
    let totalPages = 1;

    function totalHeightWithoutFooter() {
      return totalHeight - footerSectionHeight - footerMargin;
    }
    function isFooterSplittedBeetwenPages() {
      let heightOfContentWithFooterOnLastPage = totalHeight % pageHeight;
      return (
        heightOfContentWithFooterOnLastPage <
        footerSectionHeight + footerMargin + pagingHeight
      );
    }
    function isTableSplittedBeetwenPages() {
      return totalHeightWithoutFooter() > (totalPages - 1) * pageHeight;
    }

    do {
      pendingTotalPages = totalPages;
      let timesHeaderShown = Math.max(0, totalPages - 2);

      totalHeight =
        initialContentHeight +
        footerMargin +
        timesHeaderShown * headerHeight +
        (totalPages - (isFooterSplittedBeetwenPages() ? 1 : 0)) * pagingHeight +
        overhead * (totalPages - 1);

      timesHeaderShown =
        totalPages -
        1 -
        (isTableSplittedBeetwenPages() ? 0 : totalPages > 1 ? 1 : 0);

      totalHeight =
        initialContentHeight +
        footerMargin +
        timesHeaderShown * headerHeight +
        (totalPages - (isFooterSplittedBeetwenPages() ? 1 : 0)) * pagingHeight +
        overhead * (totalPages - 1);

      totalPages = Math.ceil(totalHeight / pageHeight);
    } while (totalPages > pendingTotalPages);

    let result = {
      totalPages: totalPages,
      isFooterSplittedBeetwenPages: isFooterSplittedBeetwenPages()
    };

    if (this.state.isTest) {
      Object.assign(result, {
        initialContentHeight: initialContentHeight,
        totalPagesHeight: totalPages * pageHeight,
        calculatedTotalHeight: totalHeight,
        calcualtedTotalHeightWithoutFooter: totalHeightWithoutFooter()
      });
    }

    return result;
  }

  componentDidMount() {
    setTimeout(() => {
      let printRelatedCalculations = this.performPrintRelatedCalculations();
      this.setState({
        totalPages: printRelatedCalculations.totalPages,
        isFooterSplittedBeetwenPages:
          printRelatedCalculations.isFooterSplittedBeetwenPages,

        initialContentHeight: printRelatedCalculations.initialContentHeight,
        totalPagesHeight: printRelatedCalculations.totalPagesHeight,
        calculatedTotalHeight: printRelatedCalculations.calculatedTotalHeight,
        calcualtedTotalHeightWithoutFooter:
          printRelatedCalculations.calcualtedTotalHeightWithoutFooter
      });
    });
  }

  render() {
    let data = this.mapData(window.data);

    return (
      <div style={{ fontFamily: data.font }} className="app">
        {this.state.isTest && (
          <div className="test-height">
            <div style={{ height: this.state.initialContentHeight }}>
              initialContentHeight
            </div>
            <div style={{ height: this.state.totalPagesHeight }}>
              totalPagesHeight
            </div>
            <div style={{ height: this.state.calculatedTotalHeight }}>
              calculatedTotalHeight
            </div>
            <div
              style={{ height: this.state.calcualtedTotalHeightWithoutFooter }}
            >
              calcualtedTotalHeightWithoutFooter
            </div>
          </div>
        )}
        <div className="main-container">
          <Table
            headerData={data.headerData}
            contactsData={data.contactsData}
            additionalInfoData={data.additionalInfoData}
            tableData={data.tableData}
            totalPages={this.state.totalPages}
          />
          <Footer
            {...data.footerData}
            isSplitted={this.state.isFooterSplittedBeetwenPages}
          />
        </div>
      </div>
    );
  }
}

export default App;
