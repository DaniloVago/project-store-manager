const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = chai;

const salesController = require('../../../src/controllers/salesController');
const salesService = require('../../../src/services/salesService');
const { listAllSales, listSaleId } = require('../../mocks/sales.mock');
const { validateSales } = require('../../../src/middlewares/validateSales');

describe('Testes da camada controller do Sales', function () {
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
        sinon.stub(salesService, 'getAll').resolves(listAllSales);
        // a
        await salesController.getAll(req, res);
        // a
        expect(res.status).to.be.calledWith(200);
        expect(res.json).to.be.calledWith(listAllSales);
    });

    it('Teste da função getById, id inexistente', async function () {
        req.params = { id: 111 };
        // a
        sinon.stub(salesService, 'getById').resolves(false);
        // a
        await salesController.getById(req, res);
        // a
        expect(res.status).to.be.calledWith(404);
        expect(res.json).to.be.calledWith({ message: 'Sale not found' });
    });

    it('Teste da função getById, id existente', async function () {
        req.params = { id: 1 };
        // a
        sinon.stub(salesService, 'getById').resolves(listSaleId);
        // a
        await salesController.getById(req, res);
        // a
        expect(res.status).to.be.calledWith(200);
        expect(res.json).to.be.calledWithExactly(listSaleId);
    });

    it('Teste da função validateSales, sem o campo productId', async function () {
        req.body = [{ quantity: 1 }];
        const next = sinon.stub();
        // a
        // a
        await validateSales(req, res, next);
        // a
        expect(res.status).to.be.calledWith(400);
        expect(res.json).to.be.calledWith(
            { message: '"productId" is required' },
        );
    });

    it('Teste da função validateSales, sem o campo quantity', async function () {
        req.body = [{ productId: 1 }];
        const next = sinon.stub();
        // a
        // a
        await validateSales(req, res, next);
        // a
        expect(res.status).to.be.calledWith(400);
        expect(res.json).to.be.calledWith(
            { message: '"quantity" is required' },
        );
    });

    it('Teste da função validateSales, com o campo quantity igual a 0', async function () {
        req.body = [{ productId: 1, quantity: 0 }];
        const next = sinon.stub();
        // a
        // a
        await validateSales(req, res, next);
        // a
        expect(res.status).to.be.calledWith(422);
        expect(res.json).to.be.calledWith(
            { message: '"quantity" must be greater than or equal to 1' },
        );
    });

        it('Teste da função validateSales, com o campo productId inexistente', async function () {
            req.body = [{ productId: 111, quantity: 0 }];
            // a
            sinon.stub(salesService, 'createSales').resolves(
                { message: 'Product not found', type: 404 },
            );
            // a
            await salesController.createSales(req, res);
            // a
            expect(res.status).to.be.calledWith(404);
            expect(res.json).to.be.calledWith(
                { message: 'Product not found' },
            );
    });
});