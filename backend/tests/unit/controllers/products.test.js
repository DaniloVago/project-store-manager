const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = chai;

const productsController = require('../../../src/controllers/productsController');
const productsService = require('../../../src/services/productsService');
const { listAllProducts, createdProduct } = require('../../mocks/products.mock');
const { validateName } = require('../../../src/middlewares/validateName');

describe('Testes da camada controller do Products', function () {
    const req = {};
    const res = {};

    beforeEach(function () {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
    });

    afterEach(function () {
        sinon.restore();
    });

    it('Teste da função getAll, retornando todos os produtos', async function () {
        // a
        sinon.stub(productsService, 'getAll').resolves(listAllProducts);
        // a
        await productsController.getAll(req, res);
        // a
        expect(res.status).to.be.calledWith(200);
        expect(res.json).to.be.calledWith(listAllProducts);
    });

    it('Teste da função getById, id inexistente', async function () {
        req.params = { id: 111 };
        // a
        sinon.stub(productsService, 'getById').resolves(false);
        // a
        await productsController.getById(req, res);
        // a
        expect(res.status).to.be.calledWith(404);
        expect(res.json).to.be.calledWith({ message: 'Product not found' });
    });

    it('Teste da função getById, id existente', async function () {
        req.params = { id: 1 };
        // a
        sinon.stub(productsService, 'getById').resolves(listAllProducts[0]);
        // a
        await productsController.getById(req, res);
        // a
        expect(res.status).to.be.calledWith(200);
        expect(res.json).to.be.calledWithExactly(listAllProducts[0]);
    });

    it('Teste da função createProducts, retornando o produto criado', async function () {
        req.body = { name: 'ProdutoX' };
        // a
        sinon.stub(productsService, 'createProducts').resolves(createdProduct);
        // a
        await productsController.createProducts(req, res);
        // a
        expect(res.status).to.be.calledWith(201);
        expect(res.json).to.be.calledWith(createdProduct);
    });

    it('Teste da função validateProducts, sem o campo nome', async function () {
        req.body = { };
        const next = sinon.stub();
        // a
        // a
        await validateName(req, res, next);
        // a
        expect(res.status).to.be.calledWith(400);
        expect(res.json).to.be.calledWith(
            { message: '"name" is required' },
        );
    });

    it('Teste da função validateProducts, sem o campo nome correto', async function () {
        req.body = { name: 'Prod' };
        const next = sinon.stub();
        // a
        // a
        await validateName(req, res, next);
        // a
        expect(res.status).to.be.calledWith(422);
        expect(res.json).to.be.calledWith(
            { message: '"name" length must be at least 5 characters long' },
        );
    });
});