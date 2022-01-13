const express = require('express');
const morgan = require('morgan');
const app = express();
require('dotenv/config');
const cors = require('cors');

// midlewares
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan('tiny'));

const api = process.env.API_URL;
app.get(`${api}/products`, (req, res) => {
  const product = {
    id: 1,
    name: 'Product 1',
    price: 100,
  };
  res.send(product);
});
app.post(`${api}/products`, (req, res) => {
  const newProduct = req.body;
  console.log(newProduct);
  res.send(newProduct);
});
app.listen(3000, () => console.log('Server started on port 3000'));
