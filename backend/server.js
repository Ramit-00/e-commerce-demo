import express from 'express';
import 'dotenv/config';
import connectDB from './Database/db.js';
import userRoute from './routes/userRoutes.js';
import sellerRoute from './routes/sellerRoutes.js';
import adminRoute from './routes/AdminRoutes.js';
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());  // for parsing application/json  // app.use(bodyParser.json()) is deprecated in newer versions of Express, so we use express.json() instead. It parses incoming JSON requests and puts the parsed data in req.body.
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}))

app.use('/api/v1/user', userRoute)    //  https://localhost:8000/api/v1/user/register -> this is the route for user related operations
app.use('/api/v1/seller', sellerRoute)  //  https://localhost:8000/api/v1/seller/profile -> this is the route for seller related operations
app.use('/api/v1/admin', adminRoute)  //  https://localhost:8000/api/v1/admin/seller/:id/status/:status -> this is the route for admin related operations

app.listen(PORT, async()=>{
  await connectDB();
  console.log(`Server is listening on port ${PORT}`)
})