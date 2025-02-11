const config = require('config');

const app = require('./app')

const PORT = process.env.PORT || 443;

app.listen(PORT, () => {
    console.log(process.env.NODE_ENV);
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
  });