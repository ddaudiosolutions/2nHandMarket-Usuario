/// <reference types="cypress" />

describe('<Home />', () => {
  it('<Home />', () => {
    cy.visit('/');

    cy.contains('MERCADO DE 2A MANO NO PROFESIONAL');

    cy.get('[data-cy=btn-registrate').invoke('text').should('equal', 'REGISTRATE');

    //REVISAR BOTONES

    cy.get('[data-cy=btn-registrate').should('exist');

    cy.get('[data-cy=btn-iniciarsesion').should('exist');
  });
});
