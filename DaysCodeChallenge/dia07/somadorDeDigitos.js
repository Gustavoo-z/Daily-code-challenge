import { readline } from "../../utils/readline.js";

function perguntarNumero() {
  readline.question("\nQual número você deseja fazer a soma? > ", (numero) => {
    if (!ehInteiro(numero)) {
      console.log("❌ Digite um inteiro válido (ex.: -123, 0, 456).");
      return perguntarNumero();
    }
    somarDigitos(numero);
  });
}

function somarDigitos(numero) {
  const digitos = Math.abs(numero).toString();
  let soma = 0;

  for (let i = 0; i < digitos.length; i++) {
    soma += Number(digitos[i]);
  }

  console.log(
    `\nA soma do número ${Number(numero)} é ${soma} (${
      soma % 2 === 0 ? "par" : "ímpar"
    }).\n`
  );
  readline.close();
}

function ehInteiro(str) {
  return /^-?\d+$/.test(str.trim());
}

perguntarNumero();
