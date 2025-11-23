describe('Gerenciamento de Cursos', () => {
  const user = {
    name: 'Admin Cursos',
    email: 'admin_cursos@cypress.com',
    password: '@AdminPassword123'
  };

  beforeEach(() => {
    cy.createTestUser(user);
    cy.login(user.email, user.password);
    cy.url().should('eq', 'http://localhost:3001/');
  });

  it('Deve criar um novo curso', () => {
    cy.visit('http://localhost:3001/courses');
    cy.contains('a', 'Novo Curso').click();

    cy.get('input[name="name"]').type('Curso de Teste E2E');
    cy.get('textarea[name="description"]').type('Descrição do curso de teste');
    
    cy.contains('button', 'Salvar').click();

    cy.url().should('include', '/courses');
    cy.contains('Curso de Teste E2E').should('be.visible');
  });

  it('Deve editar um curso', () => {
    cy.visit('http://localhost:3001/courses');
    
    cy.document().then((doc) => {
        if (doc.querySelectorAll('tbody tr').length === 0) {
            cy.contains('a', 'Novo Curso').click();
            cy.get('input[name="name"]').type('Curso Temporário');
            cy.contains('button', 'Salvar').click();
        }
    });

    cy.get('tbody tr').first().within(() => {
        cy.contains('a', 'Editar').click();
    });

    cy.get('input[name="name"]').clear().type('Curso Editado Cypress');
    cy.contains('button', 'Salvar').click();

    cy.contains('Curso Editado Cypress').should('be.visible');
  });

  it('Deve excluir um curso', () => {
    cy.visit('http://localhost:3001/courses');

    cy.document().then((doc) => {
        if (doc.querySelectorAll('tbody tr').length === 0) {
            cy.contains('a', 'Novo Curso').click();
            cy.get('input[name="name"]').type('Curso Para Deletar');
            cy.contains('button', 'Salvar').click();
        }
    });
    
    cy.on('window:confirm', () => true);

    cy.get('tbody tr').first().find('td').eq(1).invoke('text').then((text) => {
        const cursoNome = text.trim();
        
        cy.get('tbody tr').first().find('button.btn-danger').click();
        
        cy.contains(cursoNome).should('not.exist');
    });
  });
});