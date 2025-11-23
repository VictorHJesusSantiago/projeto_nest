describe('Gerenciamento de Usuários (API)', () => {
  const adminUser = {
    name: 'Super Admin',
    email: 'super_admin@cypress.com',
    password: '@AdminPassword123'
  };

  let authToken;

  beforeEach(() => {
    cy.createTestUser(adminUser);
    cy.login(adminUser.email, adminUser.password);
    cy.url().should('eq', 'http://localhost:3001/');
    
    cy.window().should((win) => {
        expect(win.localStorage.getItem('token')).to.be.a('string');
    }).then((win) => {
      authToken = win.localStorage.getItem('token');
    });
  });

  it('Deve listar os usuários cadastrados (via API)', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/users',
      qs: { limit: 100 },
      headers: { Authorization: `Bearer ${authToken}` }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      const userFound =HD => response.body.find(u => u.email === adminUser.email);
      expect(userFound).to.not.be.undefined;
    });
  });

  it('Deve editar um usuário (via API)', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/users',
      qs: { limit: 100 },
      headers: { Authorization: `Bearer ${authToken}` }
    }).then((resList) => {
      const userToEdit = resList.body.find(u => u.email === adminUser.email);
      
      expect(userToEdit).to.not.be.undefined;

      cy.request({
        method: 'PATCH',
        url: `http://localhost:3000/users/${userToEdit.id}`,
        headers: { Authorization: `Bearer ${authToken}` },
        body: {
          name: 'Admin Editado API'
        }
      }).then((resUpdate) => {
        expect(resUpdate.status).to.eq(200);
        expect(resUpdate.body.name).to.eq('Admin Editado API');
      });
    });
  });

  it('Deve excluir um usuário (via API)', () => {
    const userToDelete = { name: 'User Delete', email: `del_${Date.now()}@test.com`, password: '123456' };
    
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/auth/register',
      body: userToDelete,
      failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.be.oneOf([200, 201, 409]);

        cy.request({
            method: 'GET',
            url: 'http://localhost:3000/users',
            qs: { limit: 100 },
            headers: { Authorization: `Bearer ${authToken}` }
        }).then((resList) => {
            const targetUser = resList.body.find(u => u.email === userToDelete.email);
            
            expect(targetUser).to.not.be.undefined;

            cy.request({
                method: 'DELETE',
                url: `http://localhost:3000/users/${targetUser.id}`,
                headers: { Authorization: `Bearer ${authToken}` }
            }).then((resDelete) => {
                expect(resDelete.status).to.eq(200);
                
                cy.request({
                    method: 'GET',
                    url: `http://localhost:3000/users/${targetUser.id}`,
                    headers: { Authorization: `Bearer ${authToken}` },
                    failOnStatusCode: false
                }).then((resCheck) => {
                    expect(resCheck.status).to.eq(404);
                });
            });
        });
    });
  });
});