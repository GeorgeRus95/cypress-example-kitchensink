describe('Input Forms - Simple Form Demo', () => {
  beforeEach(() => {
    cy.visit('https://www.lambdatest.com/selenium-playground/');
    cy.clickLink('Simple Form Demo');
  })

  it('Single Input Field', () => {
    const inputText = 'Test';

    cy.get('#user-message').type(inputText);
    cy.get('#showInput').click();

    cy.get('#message').should('have.text', inputText);
  })

  it('Two Input Fields', () => {
    const a = 1;
    const b = 1;
    const expectedSum = 2;
  
    cy.get('#sum1').type(a);
    cy.get('#sum2').type(b);
    cy.get('#gettotal button').click();

    cy.get('#addmessage').should('have.text', expectedSum);
  })
})