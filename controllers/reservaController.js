const Reservas = require('../models/Reservas');
const { Op } = require("sequelize");

  class reservaController {
    static async create(req, res) {
      try {
        const { sala, horario } = req.body;

        // Verificar se já existe uma reserva para a mesma sala e horário
        const reservaExistente = await Reservas.findOne({
          where: {
            sala,
            horario,
          },
        });

        if (reservaExistente) {
          return res.status(400).json({ error: 'Já existe uma reserva para este horário e sala.' });
        }

        // Criar a reserva se não houver conflito
        const novaReserva = await Reservas.create({ sala, horario });

        return res.status(201).json(novaReserva);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao criar a reserva.' });
      }
    }

  static async findAll(req, res) {
    try {
      console.log(req.query);
      const where = {
        id_reserva: {
          [Op.like]: `%${req.query.id_reserva?req.query.id_reserva:""}%` 
        }
      }
      const reservas = await Reservas.findAll({where});
      return res.status(200).json(reservas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao listar os reserva.' });
    }
  }

  static async findById(req, res) {
    try {
      const { id_reserva } = req.params;
      const reservas = await Reservas.findByPk(id_reserva);
      return res.status(200).json(reservas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao listar o reserva.' });
    }
  }

  static async put(req, res) {
  try {
    
    const { id_reserva } = req.params; // Obtém o ID do reserva a ser atualizado
    const {  horario,
             id_aluno,
             sala,
             id_ADM } = req.body;
    
    const reservas = await Reservas.findByPk(id_reserva);
    const reservaExistente = await Reservas.findOne({
      where: {
        sala,
        horario,
      },
    });
    if (reservaExistente) {
      return res.status(400).json({ error: 'Já existe uma reserva para este horário e sala.' });
    }
    
    if (!reservas) {
      return res.status(404).json({ error: 'Reservas não encontrado.' });
    }

    reservas.horario = horario; // Atualiza o título do reserva
    reservas.id_aluno = id_aluno; // Atualiza a descrição do reserva
    reservas.id_ADM = id_ADM;
    reservas.sala = sala;

    await reservas.save(); // Salva as atualizações no banco de dados

    return res.status(200).json(reservas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao atualizar o reserva.' });
  }
}

  static async patch(req, res) {
    try {
      const { id_reserva } = req.params; // O ID do usuário que você deseja atualizar
      const { sala, horario } = req.body;

      // Verificar se já existe uma reserva para o mesmo horário e sala
      const reservaExistente = await Reservas.findOne({
        where: {
          sala,
          horario, // Exclua a própria reserva da verificação
        },
      });

      if (reservaExistente) {
        return res.status(400).json({ error: 'Já existe uma reserva para este horário e sala.' });
      }
      // Verifique se o usuário com o ID especificado existe
      const reservas = await Reservas.findByPk(id_reserva);

      if (!reservas)
      {
        return res.status(404).json({ error: 'Reservas não encontrado.' });
      }


      await reservas.update(req.body);

      return res.status(200).json(reservas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao atualizar o reserva.' });
    }
  }

static async delete(req, res) {
  try {
    const { id_reserva } = req.params; // Capturando o ID do reserva a ser deletado

    // Verifique se o reserva com o ID fornecido existe
    const reservaExistente = await Reservas.findByPk(id_reserva);

    if (!reservaExistente) {
      return res.status(404).json({ error: 'Reservas não encontrado.' });
    }

    // Exclua o reserva
    await reservaExistente.destroy();

    return res.status(204).send(); // Resposta de sucesso sem conteúdo
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao deletar o reserva.' });
  }
}


}
module.exports = reservaController;
