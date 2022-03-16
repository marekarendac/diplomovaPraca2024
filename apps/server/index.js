const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 2000;
app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.send('Hello world');
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log('funguje stko'));
