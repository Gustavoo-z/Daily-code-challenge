import { readline } from "../../utils/readline.js";

function perguntarNumero() {
  readline.question(
    "\nQual número você deseja verificar se é primo? > ",
    (numero) => {
      const numConvertido = parseInt(numero);
      ehPrimo(numConvertido);
      readline.close();
    }
  );
}

function ehPrimo(num) {
  if (isNaN(num)) {
    return console.log("\nDigite um número válido!\n");
  }
  if (num <= 1) {
    return console.log("\nNúmeros menores ou iguais a 1 não são primos.\n");
  }
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return console.log(`\nO número ${num} não é primo.\n`);
    }
  }
  return console.log(`\nO número ${num} é primo!\n`);
}

perguntarNumero();
