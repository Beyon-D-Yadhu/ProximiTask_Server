import express, { json } from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import userRoutes from './presentation/routes/userRoutes.js';
import workerRoutes from './presentation/routes/workerRoutes.js'
import adminRoutes from './presentation/routes/adminRoutes.js'
import {config} from 'dotenv'

const app = express();
config()
const DB_URL = process.env.DB_URL
const PORT = process.env.PORT||3000
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/users', userRoutes);
app.use('/workers',workerRoutes)
app.use('/admin',adminRoutes)

mongoose.connect(DB_URL)
  .then(() => {console.log('MongoDB connected')
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.log(err));
