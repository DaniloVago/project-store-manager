const { Router } = require('express');
const productsController = require('../controllers/productsController');
const { validateName } = require('../middlewares/validateName');

const productsRouter = Router();

productsRouter.get('/', productsController.getAll);
productsRouter.get('/:id', productsController.getById);
productsRouter.post('/', validateName, productsController.createProducts);
productsRouter.put('/:id', validateName, productsController.updateProducts);

module.exports = productsRouter;
