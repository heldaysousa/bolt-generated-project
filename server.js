const express = require('express');
const { createClient } = require('@libsql/client');

const app = express();
const port = 3000;

const client = createClient({
  url: 'file:./ceo_express.db',
});

async function initializeDatabase() {
  try {
    await client.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )
    `);
    console.log('Database initialized successfully.');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

initializeDatabase();

app.get('/', (req, res) => {
  res.send('Hello from CEO Express Backend!');
});

app.get('/users', async (req, res) => {
  try {
    const result = await client.execute('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Error fetching users');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
