/// <reference types="cypress" />

Cypress.on('uncaught:exception', () => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

describe("Login", () => {
  beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
  })
  
  it("Should login with valid credentials", () => {
    const userAuth = Cypress.env('userAuth')
  
    cy.login(userAuth.userName, userAuth.password);
  
    cy.get("#userName-value").should("have.text", userAuth.userName);
    cy.contains("Log out").should("be.visible");
    cy.contains("Profile").should("be.visible");
  }) 

  it("Should display an error message when login credentials are invalid", () => {
    cy.login('$%^^1@', '$%^^1@');
  
    cy.get("#name").should('have.text', "Invalid username or password!");
  }) 

  it("Should display a warning message for already authenticated users clicking Login", () => {

    cy.login();
  
    cy.contains("Log out").should("be.visible");
    cy.contains("Profile").should("be.visible");

    cy.contains("Login").click();
    cy.get('#loading-label').should('have.text', "You are already logged in. View your profile.");
  }) 
})
