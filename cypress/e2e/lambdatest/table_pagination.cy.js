/// <reference types="cypress" />

describe('Table Pagination', () => {
  let dataset;

  beforeEach(() => {
    cy.visit('https://www.lambdatest.com/selenium-playground/table-pagination-demo');
    cy.get("#table-id tbody tr").then((result = []) => {
      dataset = result;
    })
  })

  it('Select Number Of Rows - 5 -> should display the correct number of rows per page', () => {
    const selectedNumberOfRows = 5;
    cy.get('#maxRows').select(selectedNumberOfRows.toString());

    const commonNavigationData = {
      targetPage: "next",
      expectedRowsNumber: selectedNumberOfRows,
    }

    cy.initNavigation({ selectedNumberOfRows, totalRows: dataset.length }).then(({ navigate }) => {
      cy.get(`li[data-page="${1}"]`).should("have.class", "active");

      navigate({ ...commonNavigationData, expectedPage: 2 });
      navigate({ ...commonNavigationData, expectedPage: 3 });
      navigate({ ...commonNavigationData, expectedPage: 4 });
      navigate({ ...commonNavigationData, expectedPage: 5 });
      navigate({ ...commonNavigationData, expectedPage: 6 });

      navigate({ ...commonNavigationData, targetPage: "prev", expectedPage: 5 });
      navigate({ ...commonNavigationData, targetPage: "prev", expectedPage: 4 });
      navigate({ ...commonNavigationData, targetPage: "prev", expectedPage: 3 });
      navigate({ ...commonNavigationData, targetPage: "prev", expectedPage: 2 });
      navigate({ ...commonNavigationData, targetPage: "prev", expectedPage: 1 });
    })
  })

  it('Select Number Of Rows - 15 -> should display the correct number of rows per page', () => {
    const selectedNumberOfRows = 15;
    cy.get('#maxRows').select(selectedNumberOfRows.toString());

    cy.initNavigation({ selectedNumberOfRows, totalRows: dataset.length }).then(({ navigate }) => {
      cy.get(`li[data-page="${1}"]`).should("have.class", "active");

      navigate({ targetPage: "next", expectedPage: 2, expectedRowsNumber: 15 });

      navigate({ targetPage: "prev", expectedPage: 1, expectedRowsNumber: 15 });
    })
  })

  it.skip('Select Number Of Rows - 30 -> should display the correct number of rows per page', () => {
    const selectedNumberOfRows = 30;
    cy.get('#maxRows').select(selectedNumberOfRows.toString());

    cy.initNavigation({ selectedNumberOfRows, totalRows: dataset.length }).then(({ navigate }) => {
      cy.get("#table-id tbody").find('tr:not(tr[style*="display: none"])').should("have.length", selectedNumberOfRows);

      //Is this a bug?
      navigate({ targetPage: "next", expectedPage: 2, expectedRowsNumber: 0 });

      //Is this a bug?
      navigate({ targetPage: "prev", expectedPage: 1, expectedRowsNumber: 30 });
    })
  })

  it("Last page selected - should keep user on the last page when next (>) button is pressed", () => {
    const pagination = [{
      selectedNumberOfRows: 5,
      expectedRowsNumber: 5,
      lastPage: 6,
    }, {
      selectedNumberOfRows: 15,
      expectedRowsNumber: 15,
      lastPage: 2,
    }, {
      selectedNumberOfRows: 20,
      expectedRowsNumber: 10,
      lastPage: 2,
    }, {
      selectedNumberOfRows: 10,
      expectedRowsNumber: 10,
      lastPage: 3,
    }]

    pagination.forEach(({ selectedNumberOfRows, expectedRowsNumber, lastPage }) => {
      cy.get('#maxRows').select(selectedNumberOfRows.toString());

      cy.initNavigation({ selectedNumberOfRows, totalRows: dataset.length }).then(({ navigate }) => {
        navigate({ targetPage: lastPage, expectedPage: lastPage, expectedRowsNumber });
        navigate({ targetPage: lastPage, expectedPage: lastPage, expectedRowsNumber });
      })
    })
  })

  it("First page selected - should keep user on the first page when prev (<) button is pressed", () => {
    const pagination = [{
      selectedNumberOfRows: 5,
      expectedRowsNumber: 5,
    }, {
      selectedNumberOfRows: 15,
      expectedRowsNumber: 15,
    }, {
      selectedNumberOfRows: 20,
      expectedRowsNumber: 20,
    }, {
      selectedNumberOfRows: 10,
      expectedRowsNumber: 10,
    }]

    pagination.forEach(({ selectedNumberOfRows, expectedRowsNumber }) => {
      cy.get('#maxRows').select(selectedNumberOfRows.toString());

      cy.initNavigation({ selectedNumberOfRows, totalRows: dataset.length }).then(({ navigate }) => {
        navigate({ targetPage: 1, expectedPage: 1, expectedRowsNumber });
        navigate({ targetPage: 1, expectedPage: 1, expectedRowsNumber });
      })
    })
  })

  it("Should work properly when pages are selected dinamically", () => {
    const selectedNumberOfRows = 5;
    cy.get('#maxRows').select(selectedNumberOfRows.toString());

    cy.initNavigation({ selectedNumberOfRows, totalRows: dataset.length }).then(({ navigate }) => {
      cy.get(`li[data-page="${1}"]`).should("have.class", "active");

      navigate({ targetPage: 3, expectedPage: 3, expectedRowsNumber: selectedNumberOfRows });
      navigate({ targetPage: 1, expectedPage: 1, expectedRowsNumber: selectedNumberOfRows });
      navigate({ targetPage: 3, expectedPage: 3, expectedRowsNumber: selectedNumberOfRows });
      navigate({ targetPage: 5, expectedPage: 5, expectedRowsNumber: selectedNumberOfRows });
      navigate({ targetPage: "prev", expectedPage: 4, expectedRowsNumber: selectedNumberOfRows });
      navigate({ targetPage: 6, expectedPage: 6, expectedRowsNumber: selectedNumberOfRows });
    })
  })
})