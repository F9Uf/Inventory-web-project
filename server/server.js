const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const config_env = require('./config/config_env');
const app = express();

app.use(cors());

if (config_env.NODE_ENV === 'development') {
  app.use(require('morgan')('dev'));
} else {
  app.use(require('compression')());
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./api'));

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running, Can get api on path "/api"'
  });
});

// app.use(express.static(__dirname + '/public'));
// app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
