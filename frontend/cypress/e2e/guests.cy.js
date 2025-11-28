describe('Gerenciamento de Convidados', () => {
  const user = {
    name: 'Gestor Guests',
    email: 'gestor_guests@cypress.com',
    password: '@GuestPassword123'
  };

  beforeEach(() => {
    cy.intercept('POST', /\/guests/).as('createGuest');
    cy.intercept('DELETE', /\/guests\/\d+/).as('deleteGuest');
    cy.intercept('PATCH', /\/guests\/\d+/).as('updateGuest');
    cy.intercept('GET', /\/teachers\/\d+/).as('getTeacherDetails');

    cy.createTestUser(user);
    cy.login(user.email, user.password);
    
    cy.url().should('not.include', '/login');
    cy.window().its('localStorage.token').should('exist');

    cy.window().then((win) => {
      const token = win.localStorage.getItem('token');
      cy.request({
        method: 'POST',
        url: 'http://localhost:3000/teachers',
        headers: { Authorization: `Bearer ${token}` },
        body: { name: 'Professor Anfitrião', subject: 'Festa' },
        failOnStatusCode: false
      });
    });

    cy.visit('http://localhost:3001/teachers');
    cy.get('tbody tr', { timeout: 10000 }).should('have.length.greaterThan', 0);
    cy.get('tbody tr').last().find('a.btn-secondary').click();
    
    cy.wait('@getTeacherDetails');
    cy.contains('h3', 'Lista de Convidados').should('be.visible');
  });

  it('Deve criar um novo convidado', () => {
    const guestName = `Convidado VIP ${Date.now()}`; 

    cy.contains('button', '+ Novo Convidado').click();

    cy.get('.guest-create-section').within(() => {
      cy.get('input[name="name"]').should('be.visible').type(guestName);
      cy.get('input[type="checkbox"]').check();
      cy.contains('button', 'Adicionar').click({ force: true });
    });

    cy.wait('@createGuest').its('response.statusCode').should('eq', 201);
    cy.wait('@getTeacherDetails');

    cy.contains('table tbody tr', guestName).should('be.visible');
    cy.contains('table tbody tr', guestName).contains('.badge', 'Confirmado').should('be.visible');
  });

  it('Deve editar um convidado', () => {
    const oldName = `Convidado Errado ${Date.now()}`;
    const newName = `Convidado Corrigido ${Date.now()}`;

    cy.contains('button', '+ Novo Convidado').click();
    cy.get('.guest-create-section').within(() => {
      cy.get('input[name="name"]').type(oldName);
      cy.contains('button', 'Adicionar').click({ force: true });
    });
    cy.wait('@createGuest');
    cy.wait('@getTeacherDetails');

    cy.contains('table tbody tr', oldName).should('be.visible');

    cy.contains('tr', oldName).within(() => {
      cy.contains('button', 'Editar').click();
    });

    cy.get(`input[name="name"][value="${oldName}"]`)
      .should('be.visible')
      .clear()
      .type(newName)
      .should('have.value', newName);

    cy.get('table').contains('button', 'Salvar').click({ force: true });

    cy.wait('@updateGuest').its('response.statusCode').should('eq', 200);
    cy.wait('@getTeacherDetails');

    cy.contains('table tbody tr', newName).should('be.visible');
    cy.contains('table tbody tr', oldName).should('not.exist');
  });

  it('Deve excluir um convidado', () => {
    const guestToDelete = `Convidado Delete ${Date.now()}`;

    cy.contains('button', '+ Novo Convidado').click();
    cy.get('.guest-create-section').within(() => {
      cy.get('input[name="name"]').type(guestToDelete);
      cy.contains('button', 'Adicionar').click({ force: true });
    });
    cy.wait('@createGuest');
    cy.wait('@getTeacherDetails');

    cy.on('window:confirm', () => true);

    cy.contains('tr', guestToDelete).within(() => {
      cy.contains('button', 'Excluir').click();
    });

    cy.wait('@deleteGuest').its('response.statusCode').should('eq', 200);
    cy.wait('@getTeacherDetails');

    cy.contains('tr', guestToDelete).should('not.exist');
  });
});