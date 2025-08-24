import { readline } from "../../../utils/readline.js";

// Estrutura inicial do jogo
let tabuleiro = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];
let jogadorAtual = "X";

// Função para exibir o tabuleiro
function exibirTabuleiro() {
  // TODO: Mostrar o tabuleiro formatado no console
}

// Função para verificar se a jogada é válida
function jogadaValida(linha, coluna) {
  // TODO: Retornar true se a posição estiver vazia, caso contrário false
}

// Função para fazer uma jogada
function fazerJogada(linha, coluna) {
  // TODO: Atualizar o tabuleiro com o símbolo do jogadorAtual
  // e alternar o jogador
}

// Função para verificar se alguém venceu
function verificarVencedor() {
  // TODO: Verificar todas as linhas, colunas e diagonais
  // Retornar "X", "O" ou null
}

// Função para verificar se deu empate
function verificarEmpate() {
  // TODO: Retornar true se todas as casas estiverem preenchidas e não houver vencedor
}

// Função principal do jogo
function jogar() {
  // TODO:
  // 1. Mostrar o tabuleiro
  // 2. Pedir a linha e coluna do jogador
  // 3. Validar jogada
  // 4. Fazer jogada
  // 5. Verificar vencedor ou empate
  // 6. Repetir até o jogo acabar
}

jogar();
