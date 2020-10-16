const service = require('./user.service');

class UserController {
  static async addUser(req, res, next) {
    try {
      const result = await service.add(req.body);
      res.status(200).send(result);
    } catch (e) {
      console.log(e);
      next(e);
      return;
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const result = await service.del(req.params.id);
      res.status(200).send(result);
    } catch (e) {
      console.log(e);
      next(e);
      return;
    }
  }

  static async updateUser(req, res, next) {
    try {
      const result = await service.update(req.body, req.params.id);
      res.status(200).send(result);
    } catch (e) {
      console.log(e);
      next(e);
      return;
    }
  }

  static async getUser(req, res, next) {
    try {
      const result = await service.get(req.params.id);
      res.status(200).send(result);
    } catch (e) {
      console.log(e);
      next(e);
      return;
    }
  }

  static async getAllUsers(req, res, next) {
    try {
      const result = await service.getAll();
      res.status(200).send(result);
    } catch (e) {
      console.log(e);
      next(e);
      return;
    }
  }

  static async login(req, res, next) {
    try {
      const result = await service.login(req.body);
      res.status(200).send(result);
    } catch (e) {
      console.log(e);
      next(e);
      return;
    }
  }
}

module.exports = UserController;
