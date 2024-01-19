const express = require('express');//projeto.servicos.repl.co
const cors = require('cors');
const sequelize = require('./config/database');
const app = express();
const usuarios = require('./routes/usuarios.js');
const reservas = require('./routes/reservas.js');

const PORT = 3000;

// const corsOptions = {
//   origin: 'projetointegrador.mysql.database.azure.com', // Substitua pelo seu domínio
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   optionsSuccessStatus: 204,
// };




app.use(cors());

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }))
app.use('/usuarios', usuarios);
app.use('/reservas', reservas);

;

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


