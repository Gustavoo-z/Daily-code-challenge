import { readline } from "../../../utils/readline.js";

function contarVogaisConsoantes(str) {
  const vogais = "aeiouAEIOU";
  let numVogais = 0;
  let numConsoantes = 0;
  let numCaracteres = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === " ") continue;

    numCaracteres++;

    if (vogais.includes(char)) {
      numVogais++;
    } else if (/[a-zA-Z]/.test(char)) {
      numConsoantes++;
    }
  }

  return {
    totalCaracteres: numCaracteres,
    vogais: numVogais,
    consoantes: numConsoantes,
  };
}

function perguntarFrase() {
  readline.question("Digite uma frase > ", (frase) => {
    const resultado = contarVogaisConsoantes(frase);
    console.log("Total de caracteres:", resultado.totalCaracteres);
    console.log("Vogais:", resultado.vogais);
    console.log("Consoantes:", resultado.consoantes);

    perguntarSeContinua();
  });
}

function perguntarSeContinua() {
  readline.question("Deseja fazer novamente? (S/N) > ", (resposta) => {
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
