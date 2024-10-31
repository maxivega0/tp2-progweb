const express = require('express');
const sequelize = require('./config/database');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
app.use(express.json());

app.use('/api/students', studentRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();