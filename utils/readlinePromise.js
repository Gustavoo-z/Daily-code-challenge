import readlineModule from "readline";

const rl = readlineModule.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export function readlinePromise(pergunta) {
  return new Promise((resolve) => {
    rl.question(pergunta, (resposta) => resolve(resposta));
  });
}

export function fecharReadline() {
  rl.close();
}
