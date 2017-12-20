require('./src/config/var');


const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./src/config/db');

const { accountRouter } = require('./src/api/account/route');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/account', accountRouter);

var cors = require('cors');

app.use(cors());

app.listen(process.env.PORT, () => {
    console.log(`Server listen on port ${process.env.PORT}`);
});
