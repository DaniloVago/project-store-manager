const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const getAll = async () => {
    const result = await salesModel.getAll();
    return result;
};

const getById = async (id) => {
    const result = await salesModel.getById(id);
    if (!result) {
        return false;
    }
    return result;
};

const createSales = async (data) => {
    const productById = await Promise.all(
        data.map((item) => productsModel.getById(item.productId)),
    );
    if (productById.includes(undefined)) {
        return { type: 404, message: 'Product not found' };
    }
    const result = await salesModel.createSales(data);
    return result;
};

module.exports = { getAll, getById, createSales };