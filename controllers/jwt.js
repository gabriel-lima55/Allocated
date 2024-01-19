// jwt.js
const jwt = require('jsonwebtoken');

const segredo = 'seu_segredo_secreto'; // Troque por um segredo seguro em produção

function gerarToken(usuarios) {
  const payload = {
    matricula: usuarios.matricula,
    nome: usuarios.nome,
    senha: usuarios.senha
    // Adicione outros dados do usuário que você deseja incluir no token
  };

  return jwt.sign(payload, segredo, { expiresIn: '1h' }); // Define um tempo de expiração para o token
}

function verificarToken(token) {
  try {
    const decoded = jwt.verify(token, segredo);
    return decoded;
  } catch (error) {
    return null; // Token inválido ou expirado
  }
}

module.exports = {
  gerarToken,
  verificarToken,
};
