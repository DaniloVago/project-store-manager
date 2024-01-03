const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/salesModel');
const { listAllSales, listSaleId, 
    // listCreateSales, 
    // listCreatedSales 
} = require(
    '../../mocks/sales.mock',
);

describe('Testes da camada model do Sales', function () {
    afterEach(function () {
        sinon.restore();
    });

    it('Teste da função getAll, retornando todos os produtos', async function () {
        // a
        sinon.stub(connection, 'execute').resolves([listAllSales]);
        // a
        const result = await salesModel.getAll();
        // a
        expect(result).to.be.deep.equal(listAllSales);
    });

    it('Teste da função getById, retorna um produto selecionado', async function () {
        // a
        sinon.stub(connection, 'execute').resolves([listSaleId]);
        // a
        const result = await salesModel.getById(1);
        // a
        expect(result).to.be.deep.equal(listSaleId);
    });

    // it('Teste da função createSales, retorna as vendas criadas', async function () {
    //     // a
    //     sinon.stub(connection, 'execute').resolves([listCreatedSales]);
    //     // a
    //     const result = await salesModel.createSales(listCreateSales);
    //     // a
    //     expect(result).to.be.deep.equal(listCreatedSales);
    // });
});