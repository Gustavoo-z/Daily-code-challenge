const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

function perguntarTemperatura() {
  readline.question("Qual a temperatura? > ", (temperaturaStr) => {
    const temperatura = Number(temperaturaStr);

    if (isNaN(temperatura)) {
      console.log("❌ Valor inválido. Digite um número.");
      return perguntarTemperatura();
    }

    readline.question("Qual a unidade de origem? C, F ou K > ", (unidade) => {
      try {
        const resultado = calcularTemperatura(temperatura, unidade);
        console.log(`\nResultado:`);
        console.log(`Celsius: ${resultado.C} °C`);
        console.log(`Fahrenheit: ${resultado.F} °F`);
        console.log(`Kelvin: ${resultado.K} K\n`);
      } catch (err) {
        console.error("Erro:", err.message);
      }
      perguntarSeContinua();
    });
  });
}

function calcularTemperatura(temperatura, unidade) {
  let celsius, fahrenheit, kelvin;

  switch (unidade.toUpperCase()) {
    case "C":
      celsius = temperatura;
      fahrenheit = (temperatura * 9) / 5 + 32;
      kelvin = temperatura + 273.15;
      break;
    case "F":
      celsius = ((temperatura - 32) * 5) / 9;
      fahrenheit = temperatura;
      kelvin = celsius + 273.15;
      break;
    case "K":
      celsius = temperatura - 273.15;
      fahrenheit = (celsius * 9) / 5 + 32;
      kelvin = temperatura;
      break;
    default:
      throw new Error('Unidade inválida. Use "C", "F" ou "K".');
  }

  return {
    C: parseFloat(celsius.toFixed(2)),
    F: parseFloat(fahrenheit.toFixed(2)),
    K: parseFloat(kelvin.toFixed(2)),
  };
}

function perguntarSeContinua() {
  readline.question("Deseja calcular novamente? (S/N) > ", (resposta) => {
    resposta = resposta.trim().toLowerCase();

    if (resposta === "s") {
      perguntarTemperatura();
    } else if (resposta === "n") {
      console.log("Encerrando o programa...");
      readline.close();
    } else {
      console.log("Resposta inválida! Digite S ou N.");
      perguntarSeContinua();
    }
  });
}

perguntarTemperatura();
