import { readline } from "../../utils/readline.js";

function perguntarFrase() {
  readline.question("\nDigite a frase que deseja verificar: ", (frase) => {
    const palavrasUnicas = verificarPalavras(frase);
    perguntarOrdemAlfabetica(palavrasUnicas);
  });
}

function verificarPalavras(frase) {
  frase = frase.toLowerCase();
  const fraseLimpa = frase.replace(/[^a-z0-9á-úà-ùâ-ûã-ũç\s]/gi, " ");
  const palavras = fraseLimpa.split(/\s+/).filter((p) => p.length > 0);
  return [...new Set(palavras)];
}

function perguntarOrdemAlfabetica(palavrasUnicas) {
  readline.question(
    "\nDeseja exibir as palavras em ordem alfabética? S/N > ",
    (resposta) => {
      verificarOrdem(resposta, palavrasUnicas);
      readline.close();
    }
  );
}

function verificarOrdem(resposta, palavrasUnicas) {
  resposta = resposta.toLowerCase();
  if (resposta === "s" || resposta === "sim") {
    palavrasUnicas.sort((a, b) => a.localeCompare(b, "pt"));
  } else if (resposta === "n" || resposta === "não" || resposta === "nao") {
  } else {
    console.log("Opção inválida!");
    return perguntarOrdemAlfabetica(palavrasUnicas);
  }
  console.log(`\nQuantidade de palavras únicas: ${palavrasUnicas.length}`);
  console.log(`Palavras únicas: ${palavrasUnicas}\n`);
}

perguntarFrase();
