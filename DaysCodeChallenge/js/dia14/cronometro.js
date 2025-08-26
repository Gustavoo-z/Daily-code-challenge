import { readline } from "../../../utils/readline.js";

let segundos = 0;
let intervalo = null;

function iniciarCronometro() {
  // Implementar lógica para iniciar o setInterval
}

function pausarCronometro() {
  // Implementar lógica para pausar o cronômetro
}

function zerarCronometro() {
  // Implementar lógica para resetar o cronômetro
}

function exibirTempo() {
  // Implementar lógica para formatar e mostrar tempo (mm:ss)
}

function mostrarMenu() {
  console.log("\nEscolha uma opção:");
  console.log("1 - Iniciar");
  console.log("2 - Pausar");
  console.log("3 - Zerar");
  console.log("4 - Sair");
}

function perguntar() {
  mostrarMenu();
  readline.question("Opção: ", (resposta) => {
    switch (resposta) {
      case "1":
        iniciarCronometro();
        break;
      case "2":
        pausarCronometro();
        break;
      case "3":
        zerarCronometro();
        break;
      case "4":
        readline.close();
        return;
      default:
        console.log("Opção inválida.");
    }
    perguntar();
  });
}

console.log("=== Cronômetro ===");
perguntar();
