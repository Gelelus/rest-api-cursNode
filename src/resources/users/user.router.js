const { Router } = require('express');

const UserController = require('./user.controller');

const router = Router();

router.get('/:id', UserController.getUser);
router.get('/', UserController.getAllUsers);

router.post('/', UserController.addUser);

router.put('/:id', UserController.updateUser);

router.delete('/:id', UserController.deleteUser);
module.exports = router;
