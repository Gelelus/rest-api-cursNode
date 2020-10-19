const service = require('./board.service');

class BoardController {
  static async addBoard(req, res, next) {
    try {
      const result = await service.add(req.body);
      res.status(200).send(result);
    } catch (e) {
      next(e);
      return;
    }
  }

  static async deleteBoard(req, res, next) {
    try {
      const result = await service.del(req.params.id);
      res.status(200).send(result);
    } catch (e) {
      next(e);
      return;
    }
  }

  static async updateBoard(req, res, next) {
    try {
      const result = await service.update(req.body, req.params.id);
      res.status(200).send(result);
    } catch (e) {
      next(e);
      return;
    }
  }

  static async getBoard(req, res, next) {
    try {
      const result = await service.get(req.params.id);
      res.status(200).send(result);
    } catch (e) {
      next(e);
      return;
    }
  }

  static async getAllBoards(req, res, next) {
    try {
      const result = await service.getAll();
      res.status(200).send(result);
    } catch (e) {
      next(e);
      return;
    }
  }
}

module.exports = BoardController;

