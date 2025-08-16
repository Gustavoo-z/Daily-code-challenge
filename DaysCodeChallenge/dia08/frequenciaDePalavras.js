import { readline } from "../../utils/readline.js";

function perguntarFrase() {
  readline.question(
    "\nDigite a frase que deseja verificar a frequência.\n> ",
    (frase) => {
      verificarFrase(frase);
      readline.close();
    }
  );
}

function verificarFrase(frase) {
  let arrayObjPalavras = {};
  frase = frase.toLowerCase();
  const fraseLimpa = frase.replace(/[^a-z0-9á-úà-ùâ-ûã-ũç\s]/gi, " ");
  const palavras = fraseLimpa.split(/\s+/).filter((p) => p.length > 0);
  console.log("\nContagem de palavras:\n");
  for (const palavra of palavras) {
    arrayObjPalavras[palavra] = (arrayObjPalavras[palavra] || 0) + 1;
  }
  console.log(arrayObjPalavras);
}

perguntarFrase();
