const { Router } = require('express');

const TaskController = require('./task.controller');

const router = Router();

router.get('/:boardId/tasks/:id', TaskController.getTask);
router.get('/:boardId/tasks/', TaskController.getAllTasks);

router.post('/:boardId/tasks/', TaskController.addTask);

router.put('/:boardId/tasks/:id', TaskController.updateTask);

router.delete('/:boardId/tasks/:id', TaskController.deleteTask);

module.exports = router;

