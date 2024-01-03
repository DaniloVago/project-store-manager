const validateSales = (req, res, next) => {
const data = req.body;

const checkId = data.every((item) => item.productId);
if (checkId === false) {
    return res.status(400).json({ message: '"productId" is required' });
}

const checkValueQuantity = data.some((item) => item.quantity < 1);
if (checkValueQuantity === true) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
}

const checkQuantity = data.every((item) => item.quantity);
if (checkQuantity === false) {
    return res.status(400).json({ message: '"quantity" is required' });
}

next();
};

module.exports = { validateSales };