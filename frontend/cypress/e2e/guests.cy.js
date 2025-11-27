describe('Gerenciamento de Convidados', () => {
  const user = {
    name: 'Gestor Guests',
    email: 'gestor_guests@cypress.com',
    password: '@GuestPassword123'
  };

  beforeEach(() => {
    // 1. Cria usuário e faz Login
    cy.createTestUser(user);
    cy.login(user.email, user.password);
    
    // CORREÇÃO: Aguarda explicitamente sair da página de login e o token existir
    cy.url().should('not.include', '/login');
    cy.window().its('localStorage.token').should('exist');

    // 2. Garante que existe um professor para visitar
    // Usa cy.window() para pegar o token REAL que o navegador acabou de salvar
    cy.window().then((win) => {
      const token = win.localStorage.getItem('token');
      cy.request({
        method: 'POST',
        url: 'http://localhost:3000/teachers',
        headers: { 
          Authorization: `Bearer ${token}` 
        },
        body: { name: 'Professor Anfitrião', subject: 'Festa' },
        failOnStatusCode: false
      });
    });

    // 3. Agora é seguro visitar a página interna
    cy.visit('http://localhost:3001/teachers');

    // Aguarda a tabela aparecer antes de tentar interagir
    cy.get('tbody tr', { timeout: 10000 }).should('have.length.greaterThan', 0);

    // Entra no detalhe do último professor da lista (o mais recente)
    cy.get('tbody tr').last().find('a.btn-secondary').click();
    
    // Verifica se carregou a seção de convidados
    cy.contains('h3', 'Lista de Convidados').should('be.visible');
  });

  it('Deve criar um novo convidado', () => {
    cy.contains('button', '+ Novo Convidado').click();

    cy.get('input[name="name"]').should('be.visible').type('Convidado VIP Cypress');
    cy.get('input[type="checkbox"]').check(); 
    
    cy.contains('button', 'Adicionar').click();

    cy.contains('table tbody tr', 'Convidado VIP Cypress').should('be.visible');
    cy.contains('.badge', 'Confirmado').should('be.visible');
  });

  it('Deve editar um convidado', () => {
    // Pré-condição: Cria um convidado
    cy.contains('button', '+ Novo Convidado').click();
    cy.get('input[name="name"]').type('Convidado Errado');
    cy.contains('button', 'Adicionar').click();
    
    cy.contains('table tbody tr', 'Convidado Errado').should('be.visible');

    // Edita
    cy.contains('tr', 'Convidado Errado').within(() => {
      cy.contains('button', 'Editar').click();
    });

    cy.get('input[name="name"]').clear().type('Convidado Corrigido');
    cy.contains('button', 'Salvar').click();

    cy.contains('Convidado Errado').should('not.exist');
    cy.contains('table tbody tr', 'Convidado Corrigido').should('be.visible');
  });

  it('Deve excluir um convidado', () => {
    // Pré-condição
    cy.contains('button', '+ Novo Convidado').click();
    cy.get('input[name="name"]').type('Convidado Delete');
    cy.contains('button', 'Adicionar').click();

    cy.on('window:confirm', () => true);

    cy.contains('tr', 'Convidado Delete').within(() => {
      cy.contains('button', 'Excluir').click();
    });

    cy.contains('Convidado Delete').should('not.exist');
  });
});