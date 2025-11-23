describe('Gerenciamento de Usuários', () => {
  const adminUser = {
    name: 'Super Admin',
    email: 'super_admin@cypress.com',
    password: '@AdminPassword123'
  };

  beforeEach(() => {
    cy.createTestUser(adminUser);
    cy.login(adminUser.email, adminUser.password);
    cy.url().should('eq', 'http://localhost:3001/');
  });

  it('Deve listar os usuários cadastrados', () => {
    cy.visit('http://localhost:3001/users');
    
    // Se a página não existir, o teste falha aqui de forma clara
    cy.get('h2').should('contain', 'Usuários'); // Ajuste o texto conforme seu título real

    // Aguarda carregamento
    cy.contains('Carregando...').should('not.exist');

    cy.get('table').should('be.visible');
    cy.contains(adminUser.name).should('be.visible');
  });

  it('Deve editar um usuário', () => {
    cy.visit('http://localhost:3001/users');
    cy.contains('Carregando...').should('not.exist');

    // Clica no botão editar do primeiro usuário da lista (ou busca específico)
    cy.contains('tr', adminUser.name).find('a.btn-secondary').click();

    cy.get('input[name="name"]').clear().type('Admin Editado');
    cy.contains('button', 'Salvar').click();

    cy.contains('Admin Editado').should('be.visible');
  });

  it('Deve excluir um usuário', () => {
    // Cria um usuário extra para ser deletado (para não deletar o próprio logado)
    const userToDelete = { name: 'User Delete', email: 'del@test.com', password: '123' };
    cy.createTestUser(userToDelete);

    cy.visit('http://localhost:3001/users');
    cy.contains('Carregando...').should('not.exist');
    
    cy.reload(); // Garante que a lista atualizou

    cy.on('window:confirm', () => true);

    cy.contains('tr', userToDelete.name).find('button.btn-danger').click();
    cy.contains(userToDelete.name).should('not.exist');
  });
});