const { Router } = require('express');
const taskRouter = require('../tasks/task.router');

const BoardController = require('./board.controller');

const router = Router();

router.get('/:id', BoardController.getBoard);
router.get('/', BoardController.getAllBoards);

router.post('/', BoardController.addBoard);

router.put('/:id', BoardController.updateBoard);

router.delete('/:id', BoardController.deleteBoard);

router.use(taskRouter);

module.exports = router;
