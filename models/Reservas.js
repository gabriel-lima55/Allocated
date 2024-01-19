const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importe a instância do Sequelize configurada

const Reservas = sequelize.define(
  'Reservas', 
  {
    id_reserva: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    horario: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    id_aluno: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Usuarios', // Nome da tabela de usuários
        key: 'matricula' // Coluna de referência na tabela de usuários
      }
    },
    
    id_ADM: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Usuarios', // Nome da tabela de usuários
        key: 'matricula' // Coluna de referência na tabela de usuários
      }
    },
    sala: {
      type: DataTypes.ENUM('1','2','3'),
      allowNull: false,
      defaultValue: '1'
    }
  },
  
  {
  tableName: 'Reservas', // Nome real da tabela no banco de dados
  timestamps: false,
  },
  
);


module.exports = Reservas;
