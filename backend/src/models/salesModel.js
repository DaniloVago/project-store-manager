const connection = require('./connection');

const getAll = async () => {
    const [result] = await connection
    .execute(
        `SELECT 
            pr.sale_id AS saleId,
            s.date AS date, 
            pr.product_id AS productId,
            pr.quantity AS quantity
        FROM StoreManager.sales AS s
        INNER JOIN StoreManager.sales_products AS pr
        ON s.id = pr.sale_id
        ORDER BY saleId, productId`,
        );
    return result;
};

const getById = async (id) => {
    const [result] = await connection
    .execute(
        `SELECT 
            s.date AS date, 
            pr.product_id AS productId,
            pr.quantity AS quantity
        FROM StoreManager.sales AS s
        INNER JOIN StoreManager.sales_products AS pr
        ON s.id = pr.sale_id AND pr.sale_id = ?
        ORDER BY s.id, productId`,
        [id],
);
    return result;
};

const createSales = async (data) => {
    const [{ insertId }] = await connection.execute(
      'INSERT INTO StoreManager.sales (date) VALUE(NOW())',
    );
  
    const query = `INSERT INTO StoreManager.sales_products 
      (sale_id, product_id, quantity) VALUES ?`;
  
    const sales = data.map((sale) => [insertId, sale.productId, sale.quantity]);
    
    await connection.query(query, [sales]);
  
    return { 
      id: insertId, 
      itemsSold: data, 
    };
  };

module.exports = { getAll, getById, createSales };