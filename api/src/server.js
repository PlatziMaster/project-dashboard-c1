const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


const { config } = require('./config/index');

app.use(cors());
app.use(bodyParser.json());

const ordersApi = require('./routes/orders');
const conversationsApi = require('./routes/conversations');

ordersApi(app);
conversationsApi(app);

app.listen(config.port, () => {
  console.log(`server: ${config.port}`);
});
