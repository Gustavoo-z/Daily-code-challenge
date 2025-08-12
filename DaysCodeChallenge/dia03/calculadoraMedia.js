import { readline } from "../../utils/readline.js";

let notas = [];
let id = 1;

function perguntarMedia() {
  readline.question("Quantas notas deseja inserir? > ", (quantidadeNotas) => {
    perguntarNota(quantidadeNotas);
  });
}

function perguntarNota(quantidadeNotas) {
  quantidadeNotas = Number(quantidadeNotas);
  if (id <= quantidadeNotas) {
    readline.question(`Digite a nota numero ${id} > `, (nota) => {
      if (verificaNota(nota)) {
        notas.push(Number(nota));
        id++;
        perguntarNota(quantidadeNotas);
      } else {
        console.log("Valor é inválido.");
        perguntarNota(quantidadeNotas);
      }
    });
  } else {
    console.log("Valor de notas obtido.");
    mediaNotas(notas);
    perguntarSeContinua();
    id = 1;
    notas = [];
  }
}

function verificaNota(nota) {
  if (nota.trim() === "") {
    return false;
  } else {
    nota = Number(nota);
    if (nota >= 0 && nota <= 10) {
      return true;
    } else {
      return false;
    }
  }
}

function mediaNotas(notas) {
  const qntdNotas = notas.length;
  const somaNotas = notas.reduce((acc, val) => acc + val, 0);
  const media = somaNotas / qntdNotas;
  console.log(
    `A média das notas ${notas} é ${media.toFixed(
      2
    )} portanto você está ${msgMedia(media)}`
  );
}

function msgMedia(media) {
  if (media >= 7) {
    return "Aprovado!";
  } else if (media >= 5 && media < 7) {
    return "em Recuperação.";
  } else {
    return "Reprovado!";
  }
}

function perguntarSeContinua() {
  readline.question("Deseja calcular novamente? (S/N) > ", (resposta) => {
    resposta = resposta.trim().toLowerCase();

    if (resposta === "s") {
      perguntarMedia();
    } else if (resposta === "n") {
      console.log("Encerrando o programa...");
      readline.close();
    } else {
      console.log("Resposta inválida! Digite S ou N.");
      perguntarSeContinua();
    }
  });
}

perguntarMedia();
