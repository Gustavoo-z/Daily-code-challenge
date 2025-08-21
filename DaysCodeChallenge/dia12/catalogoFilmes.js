import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fs = require("fs");
const path = require("path");
let filmes = require("./db.json");

import { readline } from "../../utils/readline.js";

console.log("\nBem-vindo ao seu catálogo de filmes!");

function exibirOpcoes() {
  console.log("\nOpções da lista: \n ");
  console.log("1 - Listar todos os filmes");
  console.log("2 - Adicionar novo filme");
  console.log("3 - Favoritar/Desfavoritar filme");
  console.log("4 - Exibir filmes favoritos");
  console.log("5 - Remover filme");
  console.log("6 - Sair \n");
  perguntarOpcao();
}

function perguntarOpcao() {
  readline.question("Qual opção deseja? > ", (opcao) => {
    if (opcao.toLowerCase() === "sair") {
      opcao = 6;
    } else {
      opcao = Number(opcao);
    }
    verificarOpcao(opcao);
  });
}

function verificarOpcao(opcao) {
  switch (opcao) {
    case 1:
      exibirTodosOsFilmes();
      readline.close();
      break;
    case 2:
      adicionarNovoFilme();
      readline.close();
      break;
    case 3:
      alternarFavorito();
      readline.close();
      break;
    case 4:
      exibirFavoritos();
      readline.close();
      break;
    case 5:
      removerFilme();
      readline.close();
      break;
    case 6:
      console.log("\nEncerrando o programa...\n");
      readline.close();
      break;
    default:
      console.log("\nPor favor digite uma das seis opções válidas.\n");
      perguntarOpcao();
  }
}

function exibirTodosOsFilmes() {
  console.log("\n=== Catálogo de Filmes ===\n");
  filmes.map((filme) =>
    filme.favorite === true
      ? console.log(`${filme.id} - ${filme.title} (${filme.year}) ⭐`)
      : console.log(`${filme.id} - ${filme.title} (${filme.year})`)
  );
  console.log("\n==========================\n");
}

function adicionarNovoFilme() {
  console.log("Implementar função de adicionar filme.");
  filmes = reordenarIds(filmes);
  salvarDB(filmes);
}

function alternarFavorito() {
  console.log("Implementar função de alternar favorito.");
  filmes = reordenarIds(filmes);
  salvarDB(filmes);
}

function exibirFavoritos() {
  console.log("\n=== Filmes Favoritos ===\n");
  filmes.map((filme) =>
    filme.favorite === true
      ? console.log(`${filme.id} - ${filme.title} (${filme.year}) ⭐`)
      : ""
  );
  console.log("\n=========================\n");
}

function removerFilme() {
  console.log("Implementar função de remover filme.");
  filmes = reordenarIds(filmes);
  salvarDB(filmes);
}

function reordenarIds(filmes) {
  return filmes.map((filme, index) => ({
    ...filme,
    id: index + 1,
  }));
}

function salvarDB(filmes) {
  const filePath = path.join(__dirname, "db.json");
  fs.writeFileSync(filePath, JSON.stringify(filmes, null, 2), "utf-8");
}

exibirOpcoes();
