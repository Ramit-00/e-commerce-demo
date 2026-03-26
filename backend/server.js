import express from 'express';
import 'dotenv/config';
import connectDB from './Database/db.js';
import userRoute from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());  // for parsing application/json

app.use('/api/v1/user', userRoute)    //  https://localhost:8000/api/v1/user/register -> this is the route for user related operations

app.listen(PORT,()=>{
  connectDB();
  console.log(`Server is listening on port ${PORT}`)
})