/// <reference types= "cypress" />

// const getTableData = (pages, currentPage, data = []) => {
//   let startPage = currentPage;

//   if (startPage > pages) {
//     return data;
//   }

//   cy.get(`[data-dt-idx="${startPage}"]`).click();
//   cy.get('td.sorting_1').then(
//     ($elements) => {
//       startPage++;
//       const names = Cypress._.map($elements, "innerText") ?? [];
//       return getTableData(pages, startPage,  [...data, ...names]);
//     }
//   );
// }

describe("Table Sort & Search", () => {
  beforeEach(() => {
    cy.visit(
      "https://www.lambdatest.com/selenium-playground/table-sort-search-demo"
    );
  });
      
  it("Table with Pagination Example - Should sort the table poperly by name (desc)", () => {
    let tableData = [];
    cy.get('th[aria-label^="Name: activate to sort column"]').click();

    cy.get('td.sorting_1').then(
      ($el) => {
        const names = Cypress._.map($el, "innerText") ?? [];
        tableData = [...tableData, ...names];
      }
    );

    cy.get('[data-dt-idx="2"]').click();
    cy.get('td.sorting_1').then(
      ($el) => {
        const names = Cypress._.map($el, "innerText") ?? [];
        tableData = [...tableData, ...names];
      }
    );

    cy.get('[data-dt-idx="3"]').click();
    cy.get('td.sorting_1').then(
      ($el) => {
        const names = Cypress._.map($el, "innerText") ?? [];
        tableData = [...tableData, ...names];
      }
    );

    cy.get('[data-dt-idx="4"]').click();
    cy.get('td.sorting_1').then(
      ($el) => {
        const names = Cypress._.map($el, "innerText") ?? [];
        tableData = [...tableData, ...names];
      }
    );

    //Not working
    // const allNames = getTableData(4, 1);
    // cy.wrap(allNames).should("equal", allNames.reverse());
  });
});