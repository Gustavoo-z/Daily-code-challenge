import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fs = require("fs");
const path = require("path");
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let filmes = require("./db.json");

import { readline } from "../../../utils/readline.js";

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
      exibirOpcoes();
      break;
    case 2:
      adicionarNovoFilme();
      break;
    case 3:
      alternarFavorito();
      break;
    case 4:
      exibirFavoritos();
      exibirOpcoes();
      break;
    case 5:
      removerFilme();
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
  filmes.forEach((filme) => {
    console.log(
      `${filme.id} - ${filme.title} (${filme.year})${
        filme.favorite ? " ⭐" : ""
      }`,
    );
  });
  console.log("\n==========================");
}

function adicionarNovoFilme() {
  readline.question(
    "\nQual o nome do filme que deseja adicionar? > ",
    (nomeFilme) => {
      readline.question(
        `\nQual o ano de lançamento de ${nomeFilme}? > `,
        (anoFilme) => {
          anoFilme = Number(anoFilme);

          function perguntarFavorito() {
            readline.question(
              `\nVocê deseja colocar o filme ${nomeFilme} (${anoFilme}) nos favoritos? (S/N) > `,
              (resposta) => {
                const r = resposta.trim().toUpperCase();

                if (r !== "S" && r !== "N") {
                  console.log("\n⚠ Entrada inválida. Digite apenas S ou N.");
                  return perguntarFavorito();
                }

                const favorito = r === "S";
                const novoFilme = criarObj(nomeFilme, anoFilme, favorito);
                filmes.push(novoFilme);
                filmes = reordenarIds(filmes);
                salvarDB(filmes);

                console.log(
                  `\n✅ Filme adicionado: ${novoFilme.title} (${
                    novoFilme.year
                  })${favorito ? " ⭐" : ""}`,
                );
                exibirOpcoes();
              },
            );
          }

          perguntarFavorito();
        },
      );
    },
  );
}

function criarObj(nome, ano, fav) {
  const novoId = filmes.length > 0 ? filmes[filmes.length - 1].id + 1 : 1;

  return {
    id: novoId,
    title: nome,
    year: ano,
    favorite: fav,
  };
}

function alternarFavorito() {
  readline.question(
    "\nQual filme você deseja favoritar ou desfavoritar? Digite o ID > ",
    (filmeParaTrocar) => {
      filmeParaTrocar = Number(filmeParaTrocar);
      let encontrou = false;

      for (const filme of filmes) {
        if (filme.id === filmeParaTrocar) {
          encontrou = true;
          filme.favorite = !filme.favorite;

          if (filme.favorite) {
            console.log(
              `\nO filme ${filme.title} (${filme.year}) foi favoritado!`,
            );
          } else {
            console.log(
              `\nO filme ${filme.title} (${filme.year}) foi desfavoritado!`,
            );
          }
          salvarDB(filmes);
          break;
        }
      }
      if (!encontrou) {
        console.log("\n❌ ID não encontrado, voltando as opções da lista...");
      }
      exibirOpcoes();
    },
  );
}

function exibirFavoritos() {
  const favoritos = filmes.filter((f) => f.favorite);

  console.log("\n=== Filmes Favoritos ===\n");

  if (favoritos.length === 0) {
    console.log("Nenhum filme favoritado ainda.");
  } else {
    favoritos.forEach((f) => {
      console.log(`${f.id} - ${f.title} (${f.year}) ⭐`);
    });
  }

  console.log("\n=========================");
}

function removerFilme() {
  readline.question(
    "\nQual filme você deseja remover? Digite o ID > ",
    (filmeParaRemover) => {
      filmeParaRemover = Number(filmeParaRemover);
      const filmeEncontrado = filmes.find((f) => f.id === filmeParaRemover);

      if (!filmeEncontrado) {
        console.log("\n❌ ID não encontrado. Nenhum filme foi removido.");
        return exibirOpcoes();
      }

      console.log(
        `\nO filme ${filmeEncontrado.title} (${filmeEncontrado.year}) foi removido!`,
      );
      filmes = filmes.filter((filme) => filme.id !== filmeParaRemover);
      filmes = reordenarIds(filmes);
      salvarDB(filmes);
      exibirOpcoes();
    },
  );
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
