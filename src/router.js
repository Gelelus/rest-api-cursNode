const { Router } = require('express');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const logger = require('./middleware/logger.handler');
const UserController = require('./resources/users/user.controller');
const auth = require('./middleware/auth.handler');

const mainRouter = Router();

mainRouter.use(logger);
mainRouter.use('/users', auth, userRouter);
mainRouter.use('/boards', auth, boardRouter);
mainRouter.post('/login', UserController.login);

module.exports = mainRouter;
