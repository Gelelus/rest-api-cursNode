const service = require('./user.service');
const status = require('../../helpers/errorStatus');

class UserController {
  static async addUser(req, res) {
    try {
      const result = await service.add(req.body);
      res.status(200).send(result);
    } catch (e) {
      res.status(status(e)).send({ error: e.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const result = await service.del(req.params.id);
      res.status(200).send(result);
    } catch (e) {
      res.status(status(e)).send({ error: e.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const result = await service.update(req.body, req.params.id);
      res.status(200).send(result);
    } catch (e) {
      res.status(status(e)).send({ error: e.message });
    }
  }

  static async getUser(req, res) {
    try {
      const result = await service.get(req.params.id);
      res.status(200).send(result);
    } catch (e) {
      res.status(status(e)).send({ error: e.message });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const result = await service.getAll();
      res.status(200).send(result);
    } catch (e) {
      res.status(status(e)).send({ error: e.message });
    }
  }
}

module.exports = UserController;
