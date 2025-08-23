import { readline } from "../../../utils/readline.js";

console.log("Bem-vindo ao jogo da forca.");

function perguntarJogo() {
  readline.question(
    "\nDeseja iniciar o jogo da forca? (S/N) > ",
    (resposta) => {
      resposta = resposta.trim().toLowerCase();
      if (resposta === "s") {
        iniciarJogo();
      } else if (resposta === "n") {
        console.log("Encerrando o programa...");
        readline.close();
      } else {
        console.log("Resposta inválida! Digite S ou N.");
        perguntarJogo();
      }
    },
  );
}

let letrasUtilizadas = [];
let tentativasRestantes = 8;

async function iniciarJogo() {
  const palavraSecreta = await obterPalavra();
  console.log(`\nA palavra secreta tem ${palavraSecreta.length} letras.`);
  mostrarProgresso(palavraSecreta);
  perguntarLetra(palavraSecreta);
}

function perguntarLetra(palavraSecreta) {
  readline.question("\nDigite uma letra: > ", (letra) => {
    letra = letra.toLowerCase();

    if (letrasUtilizadas.includes(letra)) {
      console.log("⚠️ Você já tentou essa letra!");
      return perguntarLetra(palavraSecreta);
    }

    logicaJogo(letra, palavraSecreta);
  });
}

function logicaJogo(letra, palavraSecreta) {
  adicionarLetra(letra);

  if (!palavraSecreta.includes(letra)) {
    tentativasRestantes--;
    console.log(
      `❌ Letra incorreta! Restam ${tentativasRestantes} tentativas.`,
    );
  }

  const palavraUnderscore = mostrarProgresso(palavraSecreta);

  if (tentativasRestantes <= 0) {
    console.log(`\n💀 Você perdeu! A palavra era: ${palavraSecreta}`);
    return readline.close();
  }

  if (!palavraUnderscore.includes("_")) {
    console.log(`\n🎉 Parabéns! Você acertou: ${palavraSecreta}`);
    return readline.close();
  }

  perguntarLetra(palavraSecreta);
}

function mostrarProgresso(palavraSecreta) {
  let letrasPalavraUnderscore = [];
  let letrasPalavraSecreta = palavraSecreta.split("");
  for (let i = 0; i < letrasPalavraSecreta.length; i++) {
    if (letrasUtilizadas.includes(letrasPalavraSecreta[i])) {
      letrasPalavraUnderscore.push(letrasPalavraSecreta[i]);
    } else {
      letrasPalavraUnderscore.push("_");
    }
  }
  const palavraUnderscore = letrasPalavraUnderscore.join(" ");
  console.log(`\nPalavra: ${palavraUnderscore}`);
  console.log(`Letras usadas: ${letrasUtilizadas.join(", ") || "nenhuma"}`);
  return palavraUnderscore;
}

function adicionarLetra(letra) {
  letrasUtilizadas.push(letra);
}

async function obterPalavra() {
  const res = await fetch(
    "https://random-word-api.herokuapp.com/word/?lang=pt-br",
  );
  const data = await res.json();
  return data[0];
}

perguntarJogo();
