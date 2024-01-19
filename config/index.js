module.exports = {
  database:{
    development: {
      dialect: 'mysql',
      host: 'projetointegrador.mysql.database.azure.com',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      username: 'gabriel',
      password: 'A00xwexx5',
      database: 'allocated'
    },
  }
};