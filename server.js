var express = require('express'),
  app = express(),
  staticPath = __dirname;

app.use('/', express.static(staticPath));
app.listen(process.env.PORT || 3000);
