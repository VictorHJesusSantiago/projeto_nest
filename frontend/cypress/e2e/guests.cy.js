describe('Gerenciamento de Convidados', () => {
  const user = {
    name: 'Gestor Guests',
    email: 'gestor_guests@cypress.com',
    password: '@GuestPassword123'
  };

  beforeEach(() => {
    cy.createTestUser(user);
    cy.login(user.email, user.password);
    
    cy.url().should('eq', 'http://localhost:3001/');

    cy.window().should((win) => {
      expect(win.localStorage.getItem('token')).to.be.a('string');
    }).then((win) => {
      const token = win.localStorage.getItem('token');
      
      cy.request({
        method: 'POST',
        url: 'http://localhost:3000/teachers',
        headers: { Authorization: `Bearer ${token}` },
        body: { name: 'Professor Anfitrião', subject: 'Eventos' }
      }).then((response) => {
        cy.visit(`http://localhost:3001/teachers/${response.body.id}`);
      });
    });
  });

  it('Deve criar um novo convidado', () => {
    cy.get('#guest-name').type('Convidado VIP Cypress');
    cy.get('#guest-rsvp').check();
    cy.contains('button', 'Adicionar Convidado').click();
    cy.contains('.list-item', 'Convidado VIP Cypress').should('be.visible');
  });

  it('Deve editar um convidado', () => {
    cy.get('#guest-name').type('Convidado Temp');
    cy.contains('button', 'Adicionar Convidado').click();
    cy.contains('.list-item', 'Convidado Temp').should('be.visible');

    cy.get('.list-item').first().as('guestItem');
    
    cy.get('@guestItem').find('button').contains('Editar').click();

    cy.get('@guestItem').within(() => {
        cy.get('#guest-name').clear().type('Convidado Editado');
        cy.contains('button', 'Atualizar').click();
    });

    cy.contains('.list-item', 'Convidado Editado').should('be.visible');
  });

  it('Deve excluir um convidado', () => {
    cy.get('#guest-name').type('Convidado Para Deletar');
    cy.contains('button', 'Adicionar Convidado').click();
    cy.contains('.list-item', 'Convidado Para Deletar').should('be.visible');

    cy.on('window:confirm', () => true);

    cy.get('.list-item').first().within(() => {
        cy.contains('button', 'Excluir').click();
    });
    
    cy.contains('Convidado Para Deletar').should('not.exist');
  });
});