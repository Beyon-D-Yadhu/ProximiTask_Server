import express, { json } from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import userRoutes from './presentation/routes/userRoutes.js';

const app = express();
// app.use(json());
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/users', userRoutes);

mongoose.connect('mongodb://localhost:27017/Proxi')
  .then(() => {console.log('MongoDB connected')
  app.listen(3000, () => console.log('Server running on port 3000'));
})
.catch(err => console.log(err));
