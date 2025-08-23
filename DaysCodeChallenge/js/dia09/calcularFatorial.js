import { readline } from "../../../utils/readline.js";

function perguntarNumero() {
  readline.question(
    "\nQual número você deseja calcular o fatorial? > ",
    (numero) => {
      calcularFatorial(numero);
      readline.close();
    },
  );
}

function calcularFatorial(numero) {
  let resultado = 1;
  for (let i = 2; i <= numero; i++) {
    resultado *= i;
  }
  console.log(`O fatorial de ${numero} é ${resultado}.\n`);
}

perguntarNumero();
