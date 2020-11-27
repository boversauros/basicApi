const { v4: uuidv4 } = require("uuid");

let products = [
  {
    id: uuidv4(),
    name: "Product one",
    description: "This is product one",
    price: 29.99,
  },
  {
    id: uuidv4(),
    name: "Product two",
    description: "This is product two",
    price: 59.99,
  },
  {
    id: uuidv4(),
    name: "Product three",
    description: "This is product three",
    price: 99.99,
  },
];

// @desc Get all products
// @route GET /api/v1/products

const getProducts = (req, res) => {
  res.send({
    success: true,
    api: "node",
    data: products,
  });
};

// @desc Get single product
// @route GET /api/v1/products/:id

const getProduct = (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === id);

  if (product) {
    res.send({
      success: true,
      api: "node",
      data: product,
    });
  } else {
    res.status = 404;
    res.send({
      sucess: false,
      message: "No product found",
    });
  }
};

// @desc Add product
// @route POST /api/v1/products/

const addProduct = (req, res) => {
  const body = req.body;
  if (!body) {
    res.status = 400;
    res.send = {
      sucess: false,
      message: "No data",
    };
  } else {
    const product = body;
    product.id = uuidv4();
    products.push(product);
    res.status = 201;
    res.send({
      sucess: true,
      api: "node",
      data: product,
    });
  }
};

// @desc Update product
// @route PUT /api/v1/products/:id

const updateProduct = (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === id);

  if (product) {
    const body = req.body;
    products = products.map((p) => (p.id === id ? { ...p, ...body } : p));
    res.send({
      sucess: true,
      api: "node",
      data: products,
    });
  } else {
    res.status = 404;
    res.send({
      sucess: false,
      message: "No product found",
    });
  }
};

// @desc Delete product
// @route DELETE /api/v1/products/:id

const deleteProduct = (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === id);

  if (product) {
    products = products.filter((p) => p.id !== id);
    res.send({
      sucess: true,
      api: "node",
      message: "product removed correctly",
    });
  } else {
    res.status = 404;
    res.send({
      sucess: false,
      message: "No product found",
    });
  }
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
