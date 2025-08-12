import { readline } from "../../utils/readline.js";

function perguntarNumero() {
  readline.question("Digite o número que deseja a tabuada > ", (resposta) => {
    if (isNaN(resposta) || resposta.trim() === "") {
      console.log("❌ Valor inválido. Digite um número.");
      return perguntarNumero();
    }
    const numero = Number(resposta);
    mostrarTabuada(numero);
    perguntarSeContinua();
  });
}

function mostrarTabuada(numero) {
  console.log(`\n Tabuada do ${numero}:`);
  for (let i = 0; i <= 10; i++) {
    console.log(`${numero} x ${i} = ${numero * i}`);
  }
  console.log("");
}

function perguntarSeContinua() {
  readline.question("Deseja calcular outra tabuada? (S/N) > ", (resposta) => {
    resposta = resposta.trim().toLowerCase();

    if (resposta === "s") {
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

perguntarNumero();
