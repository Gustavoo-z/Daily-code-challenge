import { readline } from "../../utils/readline.js";

const vogais = ["a", "e", "i", "o", "u"];

function perguntarFrase() {
  readline.question("\nQual frase você deseja contar vogais? > ", (frase) => {
    if (!frase.trim()) {
      console.log("\nVocê não digitou nenhuma frase!");
      readline.close();
      return;
    }
    contarVogais(frase);
    readline.close();
  });
}

function contarVogais(frase) {
  let somaVogais = 0;
  const letras = frase.toLowerCase().split("");
  for (let i = 0; i < letras.length; i++) {
    if (vogais.includes(letras[i])) {
      somaVogais++;
    } else {
      console.log(`'${letras[i]}' não é vogal`);
    }
  }
  console.log(`\nO total de vogais dessa frase é ${somaVogais}.\n`);
}

perguntarFrase();
