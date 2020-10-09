const service = require('./board.service');
const status = require('../../helpers/errorStatus');

class BoardController {
  static async addBoard(req, res) {
    try {
      const result = await service.add(req.body);
      res.status(200).send(result);
    } catch (e) {
      res.status(status(e)).send({ error: e.message });
    }
  }

  static async deleteBoard(req, res) {
    try {
      const result = await service.del(req.params.id);
      res.status(200).send(result);
    } catch (e) {
      res.status(status(e)).send({ error: e.message });
    }
  }

  static async updateBoard(req, res) {
    try {
      const result = await service.update(req.body, req.params.id);
      res.status(200).send(result);
    } catch (e) {
      res.status(status(e)).send({ error: e.message });
    }
  }

  static async getBoard(req, res) {
    try {
      const result = await service.get(req.params.id);
      res.status(200).send(result);
    } catch (e) {
      res.status(status(e)).send({ error: e.message });
    }
  }

  static async getAllBoards(req, res) {
    try {
      const result = await service.getAll();
      res.status(200).send(result);
    } catch (e) {
      res.status(status(e)).send({ error: e.message });
    }
  }
}

module.exports = BoardController;
