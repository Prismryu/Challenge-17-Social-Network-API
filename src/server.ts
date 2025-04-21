import express from 'express';
import db from './config/connection.js';
// Require model

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (_req, res) => {
  try {
    // Using model in route
    const result = await Book.find({});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});
