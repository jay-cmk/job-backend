import express from 'express'
import dotenv from 'dotenv';
import connectDB from './database/database.js';
import jobSeekerRouter from './routes/jobSeekerRoute.js';
import RecruiterRouter from './routes/recruiterRoute.js';
import cors from "cors";
import jobRoute from './routes/jobRoute.js';
import Applicationrouter from './routes/applicationRoutes.js';
import LoginRouter from './routes/LoginRoute.js';
import ProviderRouter from './routes/ProviderRoute.js';

dotenv.config();
const app = express();
const allowedOrigins = [
    process.env.FRONTEND_URL_1, 
    process.env.FRONTEND_URL_2
  ];
  
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );
  const PORT = process.env.PORT || 5000;
app.use(express.json()); 
app.use('/api/user',jobSeekerRouter)
app.use('/api/recruiter',RecruiterRouter)
app.use('/api/job',jobRoute)
app.use('/api/apply',Applicationrouter)
app.use('/api/auth',LoginRouter)
app.use('/api/authprovider',ProviderRouter)

// Sample Route
app.get('/', (req, res) => {
    res.send('Database Server is Running');
});
// Start Server
app.listen(PORT, () => {
    connectDB()
    console.log(`Server running on port ${PORT}`);
});
