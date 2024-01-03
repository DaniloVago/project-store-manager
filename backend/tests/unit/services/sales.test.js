const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const salesService = require('../../../src/services/salesService');
const salesModel = require('../../../src/models/salesModel');
const { listAllSales, listSaleId, 
    listCreateSales, 
    listCreatedSales, 
} = require(
    '../../mocks/sales.mock',
);

describe('Testes da camada service do Sales', function () {
    afterEach(function () {
        sinon.restore();
    });

    it('Teste da função getAll, retornando todos os produtos', async function () {
        // a
        sinon.stub(salesModel, 'getAll').resolves(listAllSales);
        // a
        const result = await salesService.getAll();
        // a
        expect(result).to.be.deep.equal(listAllSales);
    });

    it('Testando o findById, Id inexistente', async function () {
        // a
        sinon.stub(salesModel, 'getById').resolves(false);
        // a
        const result = await salesService.getById(111);
        // a
        expect(result).to.be.equal(false);
    });

    it('Id existente', async function () {
        // a
        sinon.stub(salesModel, 'getById').resolves(listSaleId);
        // a
        const result = await salesService.getById(1);
        // a
        expect(result).to.be.deep.equal(listSaleId);
    });

    it('Teste da função createSales, retorna as vendas criadas', async function () {
        // a
        sinon.stub(salesModel, 'createSales').resolves(listCreatedSales);
        // a
        const result = await salesModel.createSales(listCreateSales);
        // a
        expect(result).to.be.deep.equal(listCreatedSales);
    });
});