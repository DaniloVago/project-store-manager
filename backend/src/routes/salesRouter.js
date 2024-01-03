const { Router } = require('express');
const salesController = require('../controllers/salesController');
const { validateSales } = require('../middlewares/validateSales');

const salesRouter = Router();

salesRouter.get('/', salesController.getAll);
salesRouter.get('/:id', salesController.getById);
salesRouter.post('/', validateSales, salesController.createSales);

module.exports = salesRouter;