const numeros = [5, 8, 2, 10, 3];

analiseNumeros(numeros);

function analiseNumeros(array) {
  // Obter o maior número do array
  const maior = Math.max(...array);
  console.log(`O maior número do array é: ${maior}`);
  // Obter o menor número do array
  const menor = Math.min(...array);
  console.log(`O menor número do array é: ${menor}`);
  //Obter a soma de todos os números do array
  const soma = array.reduce((acc, val) => acc + val, 0);
  console.log(`A soma de todos os números do array é: ${soma}`);
}
