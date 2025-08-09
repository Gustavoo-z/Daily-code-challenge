const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

perguntarDados();

function perguntarDados() {
  console.log("\n=== Conversor de Moedas ===\n");

  readline.question(
    "Qual a moeda de origem? Exemplo: USD\n> ",
    (moedaOrigem) => {
      readline.question(
        "Qual a moeda de destino? Exemplo: BRL\n> ",
        (moedaDestino) => {
          readline.question(
            "Qual o valor a ser convertido? Exemplo: 100.50\n> ",
            (valor) => {
              moedaOrigem = moedaOrigem.trim().toUpperCase();
              moedaDestino = moedaDestino.trim().toUpperCase();
              valor = valor.trim();

              if (isNaN(valor) || Number(valor) <= 0) {
                console.log(
                  "\n❌ Por favor, insira um valor numérico maior que zero.\n"
                );
                return perguntarDados();
              }

              fetchMoeda(moedaOrigem, moedaDestino, valor);
            }
          );
        }
      );
    }
  );
}

async function fetchMoeda(moedaOrigem, moedaDestino, valor) {
  try {
    const resposta = await fetch(
      `https://api.frankfurter.app/latest?amount=${valor}&from=${moedaOrigem}&to=${moedaDestino}`
    );
    const dados = await resposta.json();

    if (!dados.rates || !dados.rates[moedaDestino]) {
      console.log(
        `\n❌ Não foi possível converter de ${moedaOrigem} para ${moedaDestino}. Verifique as moedas e tente novamente.\n`
      );
      return perguntarReiniciar();
    }

    const valorFinal = dados.rates[moedaDestino];
    console.log(
      `\n💰 ${valor} ${moedaOrigem} equivalem a ${valorFinal.toFixed(
        2
      )} ${moedaDestino}\n`
    );
    perguntarReiniciar();
  } catch (error) {
    console.log(`\n❌ Erro na requisição: ${error.message}\n`);
    perguntarReiniciar();
  }
}

function perguntarReiniciar() {
  readline.question("Deseja fazer outra conversão? (s/n)\n> ", (resposta) => {
    resposta = resposta.trim().toLowerCase();
    if (resposta === "s" || resposta === "sim") {
      perguntarDados();
    } else if (resposta === "n" || resposta === "não") {
      console.log("\n✅ Programa encerrado. Até a próxima!\n");
      readline.close();
    } else {
      console.log("\nPor favor digite um valor válido (s/n)\n");
      perguntarReiniciar();
    }
  });
}
