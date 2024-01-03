const commonSale = {
  date: '2023-05-29T19:42:28.000Z',
};

const listAllSales = [
  {
    saleId: 1,
    ...commonSale,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    ...commonSale,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    ...commonSale,
    productId: 3,
    quantity: 15,
  },
];

const listSaleId = [
  {
    ...commonSale,
    productId: 1,
    quantity: 5,
  },
  {
    ...commonSale,
    productId: 2,
    quantity: 10,
  },
];

const listCreateSales = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const listCreatedSales = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

module.exports = { listAllSales, listSaleId, listCreatedSales, listCreateSales };
