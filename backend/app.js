const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();
require('dotenv/config');
const cors = require('cors');
//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

// midlewares
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan('tiny'));
const api = process.env.API_URL;
// routes
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

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
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshopdb',
  })
  .then(() => {
    console.log('Database connection is ready...');
  })
  .catch((err) => {
    console.error(err);
  });
app.listen(3000, () => console.log('Server started on port 3000'));
