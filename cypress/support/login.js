const login = (userName = Cypress.env('userAuth').userName, password = Cypress.env('userAuth').password) => {
  cy.visit('https://demoqa.com/login');
  cy.get("#userName").type(userName);
  cy.get("#password").type(password);
  cy.get("#login").click();
};

const loginWithSession = (userName = Cypress.env('userAuth').userName, password = Cypress.env('userAuth').password) => {
  //TODO: Send through a unique id and use it for session
  cy.session([userName], () => login(userName, password), { cacheAcrossSpecs: false });
}

Cypress.Commands.addAll({ login, loginWithSession })