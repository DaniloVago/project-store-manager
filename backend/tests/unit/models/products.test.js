const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/productsModel');
const { listAllProducts, createdProduct } = require('../../mocks/products.mock');

describe('Testes da camada model do Products', function () {
    afterEach(function () {
        sinon.restore();
    });

    it('Teste da função getAll, retornando todos os produtos', async function () {
        // a
        sinon.stub(connection, 'execute').resolves([listAllProducts]);
        // a
        const result = await productsModel.getAll();
        // a
        expect(result).to.be.deep.equal(listAllProducts);
    });

    it('Teste da função getById, retorna um produto selecionado', async function () {
        // a
        sinon.stub(connection, 'execute').resolves([[listAllProducts[0]]]);
        // a
        const result = await productsModel.getById(1);
        // a
        expect(result).to.be.deep.equal(listAllProducts[0]);
    });

    it('Teste da função createProducts, retorna um produto criado', async function () {
        // a
        sinon.stub(connection, 'execute').resolves([[createdProduct]]);
        // a
        const result = await productsModel.createProducts({ name: 'ProdutoX' });
        // a
        expect(result).to.be.deep.equal(createdProduct);
    });
});