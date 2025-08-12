import { readline } from "../../utils/readline.js";

perguntarDados();

function perguntarDados() {
  console.log("\n=== Calculadora de IMC ===\n");

  readline.question("Qual a sua altura? Exemplo: 1.70\n> ", (altura) => {
    readline.question("Qual o seu peso? Exemplo: 70.5\n> ", (peso) => {
      peso = parseFloat(peso);
      altura = parseFloat(altura);

      if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        console.log(
          "\n❌ Por favor, insira valores válidos para peso e altura.\n"
        );
        readline.close();
        return;
      }

      calcularIMC(peso, altura);

      readline.question(
        "\nDeseja calcular novamente? (s/n)\n> ",
        (resposta) => {
          recalcularIMC(resposta);
        }
      );
    });
  });
}

function calcularIMC(peso, altura) {
  const imc = peso / (altura * altura);
  const imcFormatado = imc.toFixed(2);

  let mensagem = `\n📊 Seu IMC é: ${imcFormatado} → `;

  if (imc < 18.5) {
    mensagem += "Abaixo do peso.";
  } else if (imc < 25) {
    mensagem += "Peso normal.";
  } else if (imc < 30) {
    mensagem += "Sobrepeso.";
  } else {
    mensagem += "Obesidade.";
  }

  console.log(mensagem);
}

function recalcularIMC(resposta) {
  if (resposta.toLowerCase() === "s") {
    perguntarDados();
  } else if (resposta.toLowerCase() === "n") {
    console.log("\n✅ Programa encerrado. Até a próxima!\n");
    readline.close();
  } else {
    console.log("\nPor favor digite um valor válido (s/n)\n");
    readline.question("> ", (res) => {
      recalcularIMC(res);
    });
  }
}
