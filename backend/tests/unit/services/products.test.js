const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const productsService = require('../../../src/services/productsService');
const productsModel = require('../../../src/models/productsModel');
const { listAllProducts, createdProduct } = require('../../mocks/products.mock');

describe('Testes da camada service do Products', function () {
    afterEach(function () {
        sinon.restore();
    });

    it('Teste da função getAll, retornando todos os produtos', async function () {
        // a
        sinon.stub(productsModel, 'getAll').resolves(listAllProducts);
        // a
        const result = await productsService.getAll();
        // a
        expect(result).to.be.deep.equal(listAllProducts);
    });

    it('Testando o findById, Id inexistente', async function () {
        // a
        sinon.stub(productsModel, 'getById').resolves(false);
        // a
        const result = await productsService.getById(111);
        // a
        expect(result).to.be.equal(false);
    });

    it('Id existente', async function () {
        // a
        sinon.stub(productsModel, 'getById').resolves(listAllProducts[0]);
        // a
        const result = await productsService.getById(1);
        // a
        expect(result).to.be.deep.equal(listAllProducts[0]);
    });

    it('Testando o createProducts, retornando o produto criado', async function () {
        // a
        sinon.stub(productsModel, 'createProducts').resolves(createdProduct);
        // a
        const result = await productsService.createProducts({ name: 'ProdutoX' });
        // a
        expect(result).to.be.deep.equal(createdProduct);
    });
});