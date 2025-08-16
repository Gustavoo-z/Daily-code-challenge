import { readline } from "../../utils/readline.js";

function perguntarSenha() {
  readline.question("\nDigite a senha para validar.\n> ", (senha) => {
    validarSenha(senha);
    readline.close();
  });
}

function validarSenha(senha) {
  if (senha.length < 8)
    return console.log("Senha precisa ter ao menos 8 caracteres.");
  if (!/[A-Z]/.test(senha))
    return console.log("Senha precisa ter pelo menos 1 letra maiúscula.");
  if (!/[a-z]/.test(senha))
    return console.log("Senha precisa ter pelo menos 1 letra minúscula.");
  if (!/\d/.test(senha))
    return console.log("Senha precisa ter pelo menos 1 número.");
  if (!/[!@#$%^&*()_\-+={[}\]|\\:;"'<>,.?/~`]/.test(senha))
    return console.log("Senha precisa ter pelo menos 1 caractere especial.");

  console.log("Senha válida!");
}

perguntarSenha();
