/// <reference types="cypress" />

describe('<Login />', () => {
  it('<Login />', () => {
    cy.visit('/login');

    //formulario existe ???
    cy.get('[data-cy=formulario').should('exist');

    cy.get('[data-cy=btn-login').should('exist');
    //REVISAR INPUTS
    cy.get('[data-cy=email').should('exist');

    cy.get('[data-cy=password').should('exist');

    cy.get('[data-cy=email').type('raixa@raixa.com');

    cy.get('[data-cy=password').type('raixa1234');

    cy.get('[data-cy=btn-login').click();
  });
});
