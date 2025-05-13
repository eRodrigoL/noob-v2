// cypress/e2e/settings.cy.ts

describe('Tela de Preferências Visuais', () => {
  beforeEach(() => {

    cy.visit('http://localhost:8081/settings');
  });

  it('deve exibir todos os elementos da tela', () => {
    cy.get('[data-testid="settings-screen"]').should('exist');
    cy.get('[data-testid="label-fonte"]').should('contain.text', 'Fonte do corpo');
    cy.get('[data-testid="select-fonte"]').should('exist');

    cy.get('[data-testid="label-tamanho-fonte"]').should('contain.text', 'Tamanho da fonte');
    cy.get('[data-testid="controle-tamanho-fonte"]').within(() => {
      cy.get('[data-testid="btn-diminuir-fonte"]').should('exist');
      cy.get('[data-testid="btn-aumentar-fonte"]').should('exist');
    });

    cy.get('[data-testid="label-tema"]').should('contain.text', 'Tema de cores');
    cy.get('[data-testid="select-tema"]').should('exist');

    cy.get('[data-testid="btn-confirmar"]').should('exist');
    cy.get('[data-testid="btn-restaurar"]').should('exist');
    cy.get('[data-testid="btn-voltar"]').should('exist');
  });

  it('deve alterar a fonte e tema e confirmar', () => {
    // Altera a fonte
    cy.get('[data-testid="select-fonte"]').click();
    cy.contains('Roboto').click();

    // Altera o tema
    cy.get('[data-testid="select-tema"]').click();
    cy.contains('Escuro').click();

    // Aumenta a fonte
    cy.get('[data-testid="btn-aumentar-fonte"]').click();

    // Confirma as mudanças
    cy.get('[data-testid="btn-confirmar"]').click();

    cy.get('[data-testid="select-fonte"]').should('contain.text', 'Times New Roman');
    cy.get('[data-testid="select-tema"]').should('contain.text', 'Escuro');

  });

  it('deve restaurar para os valores padrões', () => {
    cy.get('[data-testid="btn-restaurar"]').click();

    // Verifica se o padrão foi reestabelecido
    // Exemplo: verificar que "Arial" está selecionado
    cy.get('[data-testid="select-fonte"]').should('contain.text', 'Arial');
    cy.get('[data-testid="select-tema"]').should('contain.text', 'Claro');
  });
});
