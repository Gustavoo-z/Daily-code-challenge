const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let quantidade = 1;
let numeroAleatorio;

console.log("--- Bem-vindo ao jogo do número secreto ---");

function gerarNumeroSecreto() {
  numeroAleatorio = Math.floor(Math.random() * 101);
  return numeroAleatorio;
}

function perguntarNumero() {
  readline.question("Digite o seu palpite > ", (resposta) => {
    verificarNumero(resposta);
  });
}

function verificarNumero(resposta) {
  resposta = Number(resposta);
  if (resposta > numeroAleatorio) {
    console.log(`O número aleatório é menor que ${resposta}`);
    quantidade = quantidade + 1;
    perguntarNumero();
  } else if (resposta < numeroAleatorio) {
    console.log(`O número aleatório é maior que ${resposta}`);
    quantidade = quantidade + 1;
    perguntarNumero();
  } else if (resposta === numeroAleatorio) {
    console.log("Parabéns, você acertou o número secreto!");
    console.log(
      `Você precisou de ${quantidade} ${pluralizar(
        "chance",
        quantidade
      )} para acertar.`
    );
    perguntarSeContinua();
  }
}

function pluralizar(texto, quantidade) {
  if (quantidade > 1) {
    return texto + "s";
  }
  return texto;
}

function perguntarSeContinua() {
  readline.question("Deseja calcular novamente? (S/N) > ", (resposta) => {
    resposta = resposta.trim().toLowerCase();

    if (resposta === "s") {
      quantidade = 1;
      gerarNumeroSecreto();
      perguntarNumero();
    } else if (resposta === "n") {
      console.log("Encerrando o programa...");
      readline.close();
    } else {
      console.log("Resposta inválida! Digite S ou N.");
      perguntarSeContinua();
    }
  });
}

gerarNumeroSecreto();
perguntarNumero();
