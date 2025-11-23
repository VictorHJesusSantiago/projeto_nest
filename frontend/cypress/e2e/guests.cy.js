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

    // Pré-requisito: Criar um professor para associar os convidados
    cy.visit('http://localhost:3001/teachers');
    
    // Se não houver professores, cria um
    cy.get('body').then(($body) => {
      if ($body.find('table tbody tr').length === 0) {
        cy.contains('a', 'Novo Professor').click();
        cy.get('input[name="name"]').type('Professor Anfitrião');
        cy.get('input[name="subject"]').type('Eventos');
        cy.contains('button', 'Salvar').click();
      }
    });

    // Entra na página de detalhes do primeiro professor (onde o GuestManager deve estar)
    cy.get('tbody tr').first().find('a.btn-secondary').click();
    
    // Verifica se o componente de convidados carregou
    cy.contains('Gerenciar Convidados').should('be.visible');
  });

  it('Deve criar um novo convidado', () => {
    cy.get('#guest-name').type('Convidado VIP Cypress');
    cy.get('#guest-rsvp').check();
    
    cy.contains('button', 'Adicionar Convidado').click();

    cy.contains('.list-item', 'Convidado VIP Cypress').should('be.visible');
  });

  it('Deve editar um convidado', () => {
    // Garante um convidado para editar
    cy.get('body').then(($body) => {
      if ($body.find('.list-item').length === 0) {
        cy.get('#guest-name').type('Convidado Temp');
        cy.contains('button', 'Adicionar Convidado').click();
      }
    });

    cy.get('.list-item').first().within(() => {
      cy.contains('button', 'Editar').click();
    });

    // O formulário aparece no lugar do item
    cy.get('#guest-name').clear().type('Convidado Editado');
    cy.contains('button', 'Atualizar').click();

    cy.contains('.list-item', 'Convidado Editado').should('be.visible');
  });

  it('Deve excluir um convidado', () => {
    // Garante um convidado
    cy.get('body').then(($body) => {
      if ($body.find('.list-item').length === 0) {
        cy.get('#guest-name').type('Convidado Para Deletar');
        cy.contains('button', 'Adicionar Convidado').click();
      }
    });

    cy.on('window:confirm', () => true);

    cy.get('.list-item').first().then(($item) => {
      const nome = $item.find('strong').text();
      cy.wrap($item).contains('button', 'Excluir').click();
      cy.contains(nome).should('not.exist');
    });
  });
});