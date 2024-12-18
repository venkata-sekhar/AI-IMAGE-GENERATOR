import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';
import apiRoutes from './routes/apiRoutes.js';dotenv.config();
const app = express();
dotenv.config();
// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Routes
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);
app.use('/api/v1',apiRoutes);

// Default Route
app.get('/', async (req, res) => {
  res.send('Hello from the backend server!');
});

// Start Server
const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URL); // Make sure this is the correct MongoDB URL
    app.listen(8081, () => {
      console.log('Server has started on port http://localhost:8081');
    });
  } catch (error) {
    console.log('Error connecting to the database:', error);
  }
};

startServer();
