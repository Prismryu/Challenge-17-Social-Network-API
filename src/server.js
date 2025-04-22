const express = require ('express');
const db = require('./config/connection.js');
const Routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware to parse JSON and urlencoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use the user routes under /api/users path
app.use('/api', Routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});