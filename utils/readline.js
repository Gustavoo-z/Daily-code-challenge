import readlineModule from "readline";

export const readline = readlineModule.createInterface({
  input: process.stdin,
  output: process.stdout,
});
