import fs from "fs";

import { readline } from "../../../utils/readline.js";

let tarefas = [];

function adicionarAoArray(tarefa) {
  tarefas.push(tarefa);
}

function perguntarTarefa() {
  readline.question(
    "Digite uma tarefa (ou 'sair' para encerrar): \n> ",
    (tarefa) => {
      if (tarefa.toLowerCase() === "sair") {
        if (tarefas.length <= 0) {
          readline.close();
        } else {
          exibeTarefas(tarefas);
        }
      } else {
        adicionarAoArray(tarefa);
        perguntarTarefa();
      }
    }
  );
}

function exibeTarefas(array) {
  console.log(`\n📋 Essas são as suas tarefas:\n`);
  array.forEach((tarefa, index) => {
    console.log(`${index + 1}. ${tarefa}`);
  });
  perguntarSeSalva();
}

function salvarEmTxt(listaTarefas) {
  const conteudo = listaTarefas.join("\n");
  fs.writeFileSync("minhasTarefas.txt", conteudo, "utf-8");
  console.log("\nArquivo salvo com sucesso! ✅");
}

function perguntarSeSalva() {
  readline.question(
    "Deseja salvar as tarefas em .txt? (s/n) \n > ",
    (resposta) => {
      if (resposta.toLowerCase() === "s" || resposta.toLowerCase() === "sim") {
        salvarEmTxt(tarefas);
        readline.close();
      } else if (
        resposta.toLowerCase() === "n" ||
        resposta.toLowerCase() === "nao" ||
        resposta.toLowerCase() === "não"
      ) {
        readline.close();
      } else {
        console.log("Valor inválido, digite novamente");
        perguntarSeSalva();
      }
    }
  );
}

if (fs.existsSync("minhasTarefas.txt")) {
  const conteudo = fs.readFileSync("minhasTarefas.txt", "utf-8");
  if (conteudo.trim()) {
    tarefas = conteudo.split("\n");
    console.log("📂 Tarefas carregadas do arquivo.\n");
  }
}

perguntarTarefa();
