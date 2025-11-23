describe('Autenticação', () => {
  const testUser = {
    name: 'Usuario Teste Auth',
    email: 'teste_auth@cypress.com',
    password: '@Password123'
  };

  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it('Deve permitir que um novo usuário se registre', () => {
    cy.visit('http://localhost:3001/register');

    const uniqueEmail = `cypress_${Date.now()}@test.com`;

    cy.get('input[name="name"]').type('Cypress Register');
    cy.get('input[name="email"]').type(uniqueEmail);
    cy.get('input[name="password"]').type('@Teste123');

    cy.contains('button', 'Criar Conta').click();

    // Aguarda o alerta ou redirecionamento
    cy.on('window:alert', (str) => {
      expect(str).to.contains('sucesso');
    });
    
    // Verifica se foi para o login
    cy.url().should('include', '/login');
  });

  it('Deve fazer login com sucesso', () => {
    // 1. Garante que o usuário existe antes de tentar logar
    cy.createTestUser(testUser);

    // 2. Tenta logar
    cy.visit('http://localhost:3001/login');
    cy.get('input[type="email"]').type(testUser.email);
    cy.get('input[type="password"]').type(testUser.password);
    cy.contains('button', 'Acessar Sistema').click();

    // 3. Verifica sucesso
    cy.url().should('eq', 'http://localhost:3001/');
    cy.contains('h1', 'Painel Administrativo').should('be.visible');
  });

  it('Deve exibir erro ao tentar logar com credenciais inválidas', () => {
    cy.visit('http://localhost:3001/login');

    cy.get('input[type="email"]').type('email_inexistente@teste.com');
    cy.get('input[type="password"]').type('senhaerrada');
    cy.contains('button', 'Acessar Sistema').click();

    cy.contains('Falha no login').should('be.visible');
  });

  it('Deve fazer logout corretamente', () => {
    // 1. Cria e loga
    cy.createTestUser(testUser);
    cy.login(testUser.email, testUser.password);
    
    // 2. Garante que está na home
    cy.url().should('eq', 'http://localhost:3001/');

    // 3. Clica em sair
    cy.contains('button', 'Sair').click();
    
    // 4. Verifica redirecionamento
    cy.url().should('include', '/login');
  });
});