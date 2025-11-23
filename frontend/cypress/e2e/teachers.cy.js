describe('Gerenciamento de Professores', () => {
  const user = {
    name: 'Admin Professores',
    email: 'admin_teachers@cypress.com',
    password: '@AdminPassword123'
  };

  beforeEach(() => {
    cy.createTestUser(user);
    cy.login(user.email, user.password);
    cy.url().should('eq', 'http://localhost:3001/');
  });

  it('Deve listar os professores', () => {
    cy.visit('http://localhost:3001/teachers');
    
    cy.contains('h2', 'Professores').should('be.visible');

    cy.contains('Carregando dados...').should('not.exist');
    
    cy.get('body').then(($body) => {
      if ($body.find('table').length > 0) {
        cy.get('table').should('be.visible');
      } else {
        cy.contains('Nenhum professor cadastrado').should('be.visible');
      }
    });
  });

  it('Deve tentar acessar o formulário de novo professor', () => {
    cy.visit('http://localhost:3001/teachers');
    
    cy.contains('Carregando dados...').should('not.exist');

    cy.contains('a', 'Novo Professor').should('be.visible').click();
    
    cy.url().should('include', '/teachers/new');
  });
});