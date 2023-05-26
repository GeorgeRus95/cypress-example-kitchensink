/// <reference types= "cypress" />

describe("Table Search", () => {
  beforeEach(() => {
    cy.visit(
      "https://www.lambdatest.com/selenium-playground/table-search-filter-demo"
    );
  });
  
  it("Tasks - Should search the table for a give criteria", () => {
    const searchCriteria = ["WIRE", "wire", "2", "Smith"];
  
    searchCriteria.forEach((value) => {
      cy.get('[data-filters="#task-table"]').type(value);
      cy.get('#task-table tbody tr:not([style*="display: none"])').each(
        ($el) => {
          //How do we test for case insensivity if we format the text?
          const formattedRowText = Cypress._.map($el, "innerText")
              .join()
              .toLocaleLowerCase();
  
          expect(formattedRowText).includes(value.toLocaleLowerCase());
        }
      );
  
      cy.get('[data-filters="#task-table"]').clear();
    });
  });
  
  //Should fail
  // eslint-disable-next-line mocha/no-skipped-tests
  it.skip("Tasks - Should remove extra spaces when searching", () => {
    const searchCriteria = [" WIRE", "WIRE "];
  
    searchCriteria.forEach((value) => {
      cy.get('[data-filters="#task-table"]').type(value);
      cy.get('#task-table tbody tr:not([style*="display: none"])').each(
        ($el) => {
          const formattedRowText = Cypress._.map($el, "innerText")
              .join()
              .toLocaleLowerCase();
  
          expect(formattedRowText).includes(value.toLocaleLowerCase());
        }
      );
  
      cy.get('[data-filters="#task-table"]').clear();
    });
  });
  
  it("Listed users - Filters should be disabled by default", () => {
    const filterSelectors = [
      { selector: 'input[placeholder="#"]' },
      { selector: 'input[placeholder="Username"]' },
      { selector: 'input[placeholder="First Name"]' },
      { selector: 'input[placeholder="Last Name"]' },
    ];
  
    filterSelectors.forEach(({ selector }) => {
      cy.get(selector).should("be.disabled");
    });
  });
  
  it("Listed users - Should search the table for a give criteria", () => {
    const filters = [
      { selector: 'input[placeholder="#"]', value: 1 },
      { selector: 'input[placeholder="Username"]', value: "Landing " },
      { selector: 'input[placeholder="First Name"]', value: "John" },
      { selector: 'input[placeholder="Last Name"]', value: "completed" },
    ];
  
    cy.get(".input-section button").click();
  
    filters.forEach(({ selector, value }) => {
      cy.get(selector).type(value);
  
      cy.get('.filterable tbody tr:not([style*="display: none"])').each(
        ($el) => {
          const formattedRowText = Cypress._.map($el, "innerText").join();
  
          expect(formattedRowText).includes(value);
        }
      );
    });
  });
});