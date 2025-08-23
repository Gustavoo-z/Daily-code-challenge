import { readline } from "../../../utils/readline.js";

const itensJogo = ["Pedra", "Papel", "Tesoura"];
const regras = {
  Pedra: "Tesoura",
  Papel: "Pedra",
  Tesoura: "Papel",
};

function perguntarItem() {
  readline.question(
    "Escolha entre Pedra, Papel e Tesoura. > ",
    (itemUsuario) => {
      itemUsuario = itemUsuario.trim().toLowerCase();
      itemUsuario = itemUsuario.charAt(0).toUpperCase() + itemUsuario.slice(1);

      if (!itensJogo.includes(itemUsuario)) {
        console.log("Opção inválida! Tente novamente.");
        return perguntarItem();
      }

      aleatorizar(itemUsuario);
      perguntarSeContinua();
    },
  );
}

function aleatorizar(itemUsuario) {
  const itemAleatorio = Math.floor(Math.random() * itensJogo.length);
  const itemMaquina = itensJogo[itemAleatorio];
  verificaResultado(itemMaquina, itemUsuario);
}

function verificaResultado(itemMaquina, itemUsuario) {
  console.log(`Você escolheu: ${itemUsuario}`);
  console.log(`A máquina escolheu: ${itemMaquina}`);

  if (itemUsuario === itemMaquina) {
    console.log(`Empate! Ambos escolheram ${itemUsuario}`);
  } else if (regras[itemUsuario] === itemMaquina) {
    console.log(`Você venceu! ${itemUsuario} vence ${itemMaquina}`);
  } else {
    console.log(`Você perdeu! ${itemMaquina} vence ${itemUsuario}`);
  }
}

function perguntarSeContinua() {
  readline.question("Deseja jogar novamente? (S/N) > ", (resposta) => {
    resposta = resposta.trim().toLowerCase();

    if (resposta === "s") {
      perguntarItem();
    } else if (resposta === "n") {
      console.log("Encerrando o programa...");
      readline.close();
    } else {
      console.log("Resposta inválida! Digite S ou N.");
      perguntarSeContinua();
    }
  });
}

perguntarItem();
