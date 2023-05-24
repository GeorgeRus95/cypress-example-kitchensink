describe("Profile", () => {
  beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    cy.loginWithSession();
  })
    
  it("Should add a book to profile", () => {
    cy.visit('https://demoqa.com/books');
    
    cy.contains('Book Store Application');

    cy.get('li.active').parent().find('#item-2').click()
    cy.contains('Git Pocket Guide').click();
    // cy.get('#addNewRecordButton').click();
  }) 
})
  