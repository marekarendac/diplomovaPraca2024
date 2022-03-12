const express = require('express');

const app = express();
const port = 2000;

app.get('/', (req, res) => {
  res.send('Hello world');
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log('funguje stko'));
