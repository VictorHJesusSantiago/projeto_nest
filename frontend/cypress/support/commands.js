// frontend/cypress/support/commands.js

// Comando para criar usuário diretamente no Backend (API)
Cypress.Commands.add('createTestUser', (user) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/auth/register', // Endpoint do backend
    body: user,
    failOnStatusCode: false // Não falha se o usuário já existir (409)
  });
});

// Comando de Login atualizado
Cypress.Commands.add('login', (email, password) => {
  cy.visit('http://localhost:3001/login');
  cy.get('input[type="email"]').clear().type(email);
  cy.get('input[type="password"]').clear().type(password);
  cy.contains('button', 'Acessar Sistema').click();
});