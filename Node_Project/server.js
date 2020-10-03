const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes= require('./routes/routes');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes);

app.listen(process.env.PORT || 3000, ()=>{
  console.log(`Server running on ${process.env.PORT || 3000}`);
} );
