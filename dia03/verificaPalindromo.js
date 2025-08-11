const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

function perguntarFrase() {
  readline.question("Digite uma frase ou palavra \n > ", (resposta) => {
    verificaPalindromo(resposta);
    perguntarSeContinua();
  });
}

function verificaPalindromo(string) {
  const cleanString = string.toLowerCase().replace(/[^a-z0-9]/g, "");
  const reverseString = cleanString.split("").reverse().join("");
  if (cleanString === reverseString) {
    console.log("Sim, é palíndromo.");
  } else {
    console.log("Não é palíndromo.");
  }
}

function perguntarSeContinua() {
  readline.question("Deseja verificar novamente? (S/N) > ", (resposta) => {
    resposta = resposta.trim().toLowerCase();

    if (resposta === "s") {
      perguntarFrase();
    } else if (resposta === "n") {
      console.log("Encerrando o programa...");
      readline.close();
    } else {
      console.log("Resposta inválida! Digite S ou N.");
      perguntarSeContinua();
    }
  });
}

perguntarFrase();
