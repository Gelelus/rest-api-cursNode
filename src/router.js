const { Router } = require('express');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const { requestLogger } = require('./helpers/logger');

const mainRouter = Router();
mainRouter.use(requestLogger);
mainRouter.use('/users', userRouter);
mainRouter.use('/boards', boardRouter);

module.exports = mainRouter;
