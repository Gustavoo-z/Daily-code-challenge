import { readline } from "../../../utils/readline.js";

let segundos = 0;
let intervalo = null;

function iniciarCronometro() {
  if (intervalo) {
    console.log("O cronômetro já está rodando!");
    return;
  }
  intervalo = setInterval(() => {
    segundos++;
    exibirTempo();
  }, 1000);
  console.log("Cronômetro iniciado!");
}

function pausarCronometro() {
  if (!intervalo) {
    console.log("O cronômetro já está pausado.");
    return;
  }
  clearInterval(intervalo);
  intervalo = null;
  console.log("Cronômetro pausado.");
}

function zerarCronometro() {
  segundos = 0;
  exibirTempo();
  console.log("Cronômetro zerado.");
}

function exibirTempo() {
  const minutos = Math.floor(segundos / 60);
  const seg = segundos % 60;
  console.log(
    `Tempo: ${String(minutos).padStart(2, "0")}:${String(seg).padStart(2, "0")}`
  );
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
        pausarCronometro();
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
