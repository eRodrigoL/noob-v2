describe('Tela de Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8081/login');
  });

  it('Deve exibir os campos de login', () => {
    cy.contains('Noob 🎲').should('exist');
    cy.get('[data-testid="input-apelido"]').should('exist'); // Usando o testID para o campo apelido
    cy.get('[data-testid="input-senha"]').should('exist'); // Usando o testID para o campo senha
    cy.contains('Entrar').should('exist');
    cy.contains('Voltar').should('exist');
  });

  it('Deve exibir erro se campos estiverem vazios', () => {
    cy.contains('Entrar').click();

    cy.contains('Por favor, preencha todos os campos.').should('exist');
  });

  it('Deve permitir digitar apelido e senha', () => {
    cy.get('[data-testid="input-apelido"]').type('meuUsuario'); // Seleciona o campo apelido pelo testID
    cy.get('[data-testid="input-senha"]').type('minhaSenha'); // Seleciona o campo senha pelo testID

    cy.get('[data-testid="input-apelido"]').should('have.value', '@meuUsuario'); // Verifica se o apelido foi digitado corretamente
  });

  it('Deve fazer login com credenciais válidas', () => {

    const apiUrl = Cypress.env('apiUrl');
    const username = Cypress.env('testUsername');
    const password = Cypress.env('testPassword');

    cy.intercept('POST', `${apiUrl}/login`).as('loginRequest');

    cy.get('[data-testid="input-apelido"]').type(username);
    cy.get('[data-testid="input-senha"]').type(password);

    cy.contains('Entrar').click();

    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response, 'A resposta da API deve existir').to.not.be.undefined;

      if (interception.response) {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.response.body).to.have.property('token');
        expect(interception.response.body.msg).to.equal('Usuário logado com sucesso!');
        expect(interception.response.body.usuario).to.have.property('id');
      }
    });
  });

});