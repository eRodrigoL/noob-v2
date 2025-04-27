// Definição da paleta de cores para a aplicação
const theme = {
  // Tema claro
  light: {
    background: "#FFFFFF",
    text: "#000000", //Substituir
    button: "#DDDDDD", //Substituir

    name: "light",
    backgroundBase: "#F2F2F7", // fundo do corpo da tela
    backgroundSemiHighlight: "#636363", // fundo de componentes neutros (botões secundários, inputs, etc.)
    backgroundHighlight: "#734500", // fundo de componentes em destaque (botões primários, cabeçalhos, etc.)
    textOnBase: "#000000", // texto no fondo padrão
    textOnSemiHighlight: "#FFFFFF", // texto no fundo semidestacado
    textOnHighlight: "#FFFFFF", // texto no fundo destacado
    border: "#C7C7CC", // cor de bordas (inputs, cards, etc.)
    shadow: "rgba(0, 0, 0, 0.1)", // sombra suave
  },

  // Tema escuro
  dark: {
    background: "#000000",
    text: "#FFFFFF", //Substituir
    button: "#333333", //Substituir

    name: "dark",
    backgroundBase: "#1C1C1E",
    backgroundSemiHighlight: "#3A3A3C",
    backgroundHighlight: "#0A84FF",
    textOnBase: "#FFFFFF",
    textOnSemiHighlight: "#FFFFFF",
    textOnHighlight: "#000000",
    border: "#48484A",
    shadow: "rgba(0, 0, 0, 0.7)",
  },

  // Tema para daltônicos
  daltonic: {
    background: "#FFFFFF",
    text: "#000000", //Substituir
    button: "#00FFFF", //Substituir

    name: "daltonic",
    backgroundBase: "#FDFDFD",
    backgroundSemiHighlight: "#7A9E9F", // tom azul-esverdeado para contraste seguro
    backgroundHighlight: "#F5A623", // laranja vivo e seguro para daltônicos
    textOnBase: "#000000",
    textOnSemiHighlight: "#FFFFFF",
    textOnHighlight: "#000000",
    border: "#B0B0B0",
    shadow: "rgba(50, 50, 50, 0.2)",
  },
};

// Exporta o objeto theme para ser usado em outros arquivos
export default theme;
