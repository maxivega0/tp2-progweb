// index.js
require('dotenv').config();
const express = require('express');
const sequelize = require('./src/config/database');
const studentRoutes = require('./src/routes/studentRoutes');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/students', studentRoutes);

// Error handling
app.use(errorHandler);

// Database and server initialization
const PORT = process.env.PORT || 3000;

async function initializeServer() {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
        
        await sequelize.sync();
        console.log('Database synchronized successfully.');
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to start server:', error);
        process.exit(1);
    }
}

initializeServer();