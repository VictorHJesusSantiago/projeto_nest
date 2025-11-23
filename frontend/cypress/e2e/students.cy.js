describe('Gerenciamento de Estudantes', () => {
  const user = {
    name: 'Admin Estudantes',
    email: 'admin_students@cypress.com',
    password: '@AdminPassword123'
  };

  beforeEach(() => {
    // Garante usuário e login
    cy.createTestUser(user);
    cy.login(user.email, user.password);
    cy.url().should('eq', 'http://localhost:3001/');
  });

  it('Deve criar um novo estudante', () => {
    cy.visit('http://localhost:3001/students');
    cy.contains('a', 'Novo Estudante').click();

    cy.get('input[name="name"]').type('Estudante Teste Cypress');
    cy.get('input[name="email"]').type(`aluno_${Date.now()}@teste.com`);
    
    // Botão corrigido para 'Salvar'
    cy.contains('button', 'Salvar').click();

    cy.url().should('include', '/students');
    cy.contains('Estudante Teste Cypress').should('be.visible');
  });

  it('Deve editar um estudante', () => {
    cy.visit('http://localhost:3001/students');
    
    // Garante que existe um estudante para editar
    cy.document().then((doc) => {
        if (doc.querySelectorAll('tbody tr').length === 0) {
            cy.contains('a', 'Novo Estudante').click();
            cy.get('input[name="name"]').type('Estudante Temporário');
            cy.get('input[name="email"]').type(`temp_${Date.now()}@teste.com`);
            cy.contains('button', 'Salvar').click();
        }
    });

    cy.get('tbody tr').first().within(() => {
        cy.contains('a', 'Editar').click();
    });

    cy.get('input[name="name"]').clear().type('Estudante Editado Cypress');
    cy.contains('button', 'Salvar').click();

    cy.contains('Estudante Editado Cypress').should('be.visible');
  });

  it('Deve excluir um estudante', () => {
    cy.visit('http://localhost:3001/students');

    // Garante que existe um estudante para excluir
    cy.document().then((doc) => {
        if (doc.querySelectorAll('tbody tr').length === 0) {
            cy.contains('a', 'Novo Estudante').click();
            cy.get('input[name="name"]').type('Estudante Para Deletar');
            cy.get('input[name="email"]').type(`del_${Date.now()}@teste.com`);
            cy.contains('button', 'Salvar').click();
        }
    });
    
    cy.on('window:confirm', () => true);

    cy.get('tbody tr').first().find('td').eq(1).invoke('text').then((text) => {
        const nomeEstudante = text.trim();
        
        cy.get('tbody tr').first().find('button.btn-danger').click();
        
        cy.contains(nomeEstudante).should('not.exist');
    });
  });
});