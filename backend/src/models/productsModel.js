const connection = require('./connection');

const getAll = async () => {
    const [result] = await connection.execute('SELECT * FROM StoreManager.products');
    return result;
};

const getById = async (id) => {
    const [[result]] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
    return result;
};

const createProducts = async (name) => {
    const query = 'INSERT INTO StoreManager.products (name) VALUE(?)';    
    await connection.execute(query, [name]);

    const [[product]] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE name = ?', [name]);
    // console.log(product);
    return product;
};

const updateProducts = async (name, id) => {
    const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
    await connection.execute(query, [name, id]);

    return { 
        id: Number(id), 
        name, 
      };
};

module.exports = { getAll, getById, createProducts, updateProducts };