const PaginationHandlers = {
  next: 'next',
  prev: 'prev'
}

const buildPageNumberMapper = ({ totalPages }) => { 
  let currentPage = 1;
  
  return ({ targetPage }) => {
    const [hasNextPage, hasPrevPage] = [currentPage < totalPages, currentPage > 1];

    if (targetPage === PaginationHandlers.next && hasNextPage) {
      currentPage++;
    } else if (targetPage === PaginationHandlers.prev && hasPrevPage) {
      currentPage--;
    } else if (targetPage === PaginationHandlers.prev) {
      currentPage = 1;
    } else if (targetPage === PaginationHandlers.next) {
      currentPage = totalPages;
    } else {
      currentPage = targetPage > totalPages || targetPage < 1 ? currentPage : targetPage;
    }

    return { currentPage } ;
  }
}

const Pagination = ({ totalRows, selectedNumberOfRows }) => {
  const totalPages = Math.ceil(totalRows / selectedNumberOfRows);
  const pageNumberMapper = buildPageNumberMapper({ totalPages })
  
  const getCurrentPageData = ({ targetPage }) => {  
    const { currentPage } = pageNumberMapper({ targetPage });

    return { pageNumber: currentPage }
  }
  
  return { getCurrentPageData }
}

Cypress.Commands.add("initNavigation", ({ selectedNumberOfRows, totalRows }) => { 
  const { getCurrentPageData } = Pagination({ selectedNumberOfRows, totalRows });

  const navigate = ({ targetPage, expectedPage, expectedRowsNumber }) => {
    const { pageNumber } = getCurrentPageData({ targetPage  })

    cy.get(`li[data-page="${pageNumber}"]`).click({ force: true })
    cy.get(`li[data-page="${expectedPage}"]`).should("have.class", "active")
    cy.get("#table-id tbody").find('tr:not(tr[style*="display: none"])').should("have.length", expectedRowsNumber)
  }

  return { navigate }
})
  