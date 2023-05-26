/// <reference types= "cypress" />

describe("Table Filter", () => {
  beforeEach(() => {
    cy.visit(
      "https://www.lambdatest.com/selenium-playground/table-records-filter-demo"
    );
  });
    
  it("Table Filter - Should filter the table properly", () => {
    const filters = [
      { filterSelector: '.btn-success', filterStatusSelector: '[data-status="pagado"]', expectedFilterColor: "Green" }, 
      { filterSelector: '.btn-warning', filterStatusSelector: '[data-status="pendiente"]', expectedFilterColor: "Orange" }, 
      { filterSelector: '.btn-danger', filterStatusSelector: '[data-status="cancelado"]', expectedFilterColor: "Red" }
    ];
    
    filters.forEach(({ filterSelector, filterStatusSelector, expectedFilterColor }) => {
      cy.get(filterSelector).click();
        
      cy.get(filterStatusSelector).each(
        ($el) => {
          const formattedRowText = Cypress._.map($el, "innerText").join()
  
          expect(formattedRowText).includes(expectedFilterColor);
        }
      );
    });
  });
});