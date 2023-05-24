/// <reference types="cypress" />

describe("Book Store", () => {
  beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    cy.loginWithSession();
  })
  
  it("Search functionality should work properly for valid entry", () => {
    const searchValue = 'JavaScript';

    cy.visit('https://demoqa.com/books');

    cy.get('#searchBox').type(searchValue);

    cy.get('span[id*="see-book"]').then(($titleCells) => {
      Cypress._.each($titleCells, (titleCell) => {
        expect(titleCell.innerText).to.contain(searchValue)
      })
    })
  }) 

  it("Search functionality should work properly for invalid entry", () => {
    const searchValue = '$%!086!2357*&';

    cy.visit('https://demoqa.com/books');
    cy.get('#searchBox').type(searchValue);

    cy.get('span[id*="see-book"]').should('have.length', 0);
    cy.get('.books-wrapper .rt-noData').should('have.text', 'No rows found')
  }) 

  it.skip("Search sort the table when clicking on Title column header", () => {
    cy.visit('https://demoqa.com/books');

    cy.contains('Title').click();

    cy.get('span[id*="see-book"]').then(($titleCells) => { 
      expect(Cypress._.map($titleCells, 'innerText')).to.be.sorted();
    })
  }) 
})
