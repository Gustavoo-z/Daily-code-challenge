import {
  readlinePromise,
  fecharReadline,
} from "../../../utils/readlinePromise.js";

let tabuleiro = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];
let jogadorAtual = "X";

function exibirTabuleiro() {
  console.clear();
  console.log(`
    ${tabuleiro[0][0]} | ${tabuleiro[0][1]} | ${tabuleiro[0][2]}
   ---+---+---
    ${tabuleiro[1][0]} | ${tabuleiro[1][1]} | ${tabuleiro[1][2]}
   ---+---+---
    ${tabuleiro[2][0]} | ${tabuleiro[2][1]} | ${tabuleiro[2][2]}
  `);
}

function jogadaValida(linha, coluna) {
  return (
    linha >= 0 &&
    linha < 3 &&
    coluna >= 0 &&
    coluna < 3 &&
    tabuleiro[linha][coluna] === " "
  );
}

function fazerJogada(linha, coluna) {
  tabuleiro[linha][coluna] = jogadorAtual;
  jogadorAtual = jogadorAtual === "X" ? "O" : "X";
}

function verificarVencedor() {
  // Linhas
  for (let i = 0; i < 3; i++) {
    if (
      tabuleiro[i][0] !== " " &&
      tabuleiro[i][0] === tabuleiro[i][1] &&
      tabuleiro[i][1] === tabuleiro[i][2]
    ) {
      return tabuleiro[i][0];
    }
  }
  // Colunas
  for (let j = 0; j < 3; j++) {
    if (
      tabuleiro[0][j] !== " " &&
      tabuleiro[0][j] === tabuleiro[1][j] &&
      tabuleiro[1][j] === tabuleiro[2][j]
    ) {
      return tabuleiro[0][j];
    }
  }
  // Diagonais
  if (
    tabuleiro[0][0] !== " " &&
    tabuleiro[0][0] === tabuleiro[1][1] &&
    tabuleiro[1][1] === tabuleiro[2][2]
  ) {
    return tabuleiro[0][0];
  }
  if (
    tabuleiro[0][2] !== " " &&
    tabuleiro[0][2] === tabuleiro[1][1] &&
    tabuleiro[1][1] === tabuleiro[2][0]
  ) {
    return tabuleiro[0][2];
  }

  return null;
}

function verificarEmpate() {
  return tabuleiro.flat().every((casa) => casa !== " ");
}

async function jogar() {
  let vencedor = null;

  while (!vencedor && !verificarEmpate()) {
    exibirTabuleiro();
    console.log(`Vez do jogador: ${jogadorAtual}`);

    const linha = parseInt(
      await readlinePromise("Informe a linha (0, 1, 2): ")
    );
    const coluna = parseInt(
      await readlinePromise("Informe a coluna (0, 1, 2): ")
    );

    if (!jogadaValida(linha, coluna)) {
      console.log("Jogada inválida! Tente novamente.");
      continue;
    }

    fazerJogada(linha, coluna);
    vencedor = verificarVencedor();
  }

  exibirTabuleiro();

  if (vencedor) {
    console.log(`Parabéns! O jogador ${vencedor} venceu!`);
  } else {
    console.log("Empate!");
  }

  fecharReadline();
}

jogar();
