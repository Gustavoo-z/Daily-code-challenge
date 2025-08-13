import { readline } from "../../utils/readline.js";

let itensDaLista = [];

console.log("\nBem-vindo a sua lista de compras!");

function exibirOpcoes() {
  console.log("\nOpções da lista: \n ");
  console.log("1 - Adicionar item");
  console.log("2 - Remover item");
  console.log("3 - Lista itens");
  console.log("4 - Sair \n");
  perguntarOpcao();
}

function perguntarOpcao() {
  readline.question("Qual opção deseja? > ", (opcao) => {
    if (opcao.toLowerCase() === "sair") {
      opcao = 4;
    } else {
      opcao = Number(opcao);
    }
    verificarOpcao(opcao);
  });
}

function verificarOpcao(opcao) {
  switch (opcao) {
    case 1:
      adicionarItem();
      break;
    case 2:
      removerItem();
      break;
    case 3:
      listarItens();
      break;
    case 4:
      console.log("\nEncerrando o programa...\n");
      readline.close();
      break;
    default:
      console.log("\nPor favor digite uma das quatro opções válidas.\n");
      perguntarOpcao();
  }
}

function adicionarItem() {
  readline.question("Qual item você deseja adicionar? > ", (item) => {
    item = item.trim().toLowerCase();
    if (!item) {
      console.log("\n❌ O item não pode estar vazio.");
      return exibirOpcoes();
    }
    if (itensDaLista.includes(item)) {
      console.log("\n⚠ Esse item já está na lista.");
      return exibirOpcoes();
    }
    itensDaLista.push(item);
    console.log(`\n✅ "${primeiraLetraMaiuscula(item)}" adicionado à lista.`);
    exibirOpcoes();
  });
}

function removerItem() {
  readline.question("Qual item você deseja remover? > ", (item) => {
    item = item.trim().toLowerCase();
    const index = itensDaLista.indexOf(item);
    if (index > -1) {
      itensDaLista.splice(index, 1);
      console.log(`\n🗑 "${primeiraLetraMaiuscula(item)}" foi removido.`);
    } else {
      console.log(
        `\n❌ O item "${primeiraLetraMaiuscula(item)}" não está na lista.`
      );
    }
    exibirOpcoes();
  });
}

function listarItens() {
  console.log(`\n📋 Sua lista de compras:`);
  console.log("-".repeat(30));

  if (itensDaLista.length === 0) {
    console.log("A sua lista está vazia, adicione itens.");
  } else {
    console.log(`Total de itens na lista: ${itensDaLista.length}\n`);
    itensDaLista.forEach((item, index) => {
      console.log(`${index + 1}. ${primeiraLetraMaiuscula(item)}`);
    });
  }

  console.log("-".repeat(30));
  exibirOpcoes();
}

function primeiraLetraMaiuscula(item) {
  return item.charAt(0).toUpperCase() + item.slice(1);
}

exibirOpcoes();
