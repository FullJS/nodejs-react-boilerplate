const express = require('express');

const accountController = require('./controller');

const accountRouter = express.Router();

accountRouter.route('/').post(accountController.create);
accountRouter.route('/:id').delete(accountController.remove);
accountRouter.route('/').patch(accountController.update);
accountRouter.route('/:id').get(accountController.getById);
accountRouter.route('/:skip/:limit').get(accountController.getList);
accountRouter.route('/').get(accountController.count);
accountRouter.route('/token/validation/:token').get(accountController.validation);

module.exports = { accountRouter };
