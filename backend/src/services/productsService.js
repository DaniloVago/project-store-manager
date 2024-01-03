const productsModel = require('../models/productsModel');

const getAll = async () => {
    const result = await productsModel.getAll();
    return result;
};

const getById = async (id) => {
    const result = await productsModel.getById(id);
    if (!result) {
        return false;
    }
    return result;
};

const createProducts = async (name) => {
    // console.log(name);
    const result = await productsModel.createProducts(name);
    return result;
};

const updateProducts = async (name, id) => {
    const productById = await productsModel.getById(id);
    if (productById === undefined) {
        return { type: 404, message: 'Product not found' };
    }
    const result = await productsModel.updateProducts(name, id);
    return result;
};

module.exports = { getAll, getById, createProducts, updateProducts };