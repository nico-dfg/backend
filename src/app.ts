import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import {DATABASE_USER, DATABASE_PASSWORD} from "./secret";
import stuffRoutes from "./routes/stuff";
import productRoutes from "./routes/product";


const app = express();

mongoose.connect("mongodb+srv://" + DATABASE_USER + ":" + DATABASE_PASSWORD + "@cluster0.iw6pw.gcp.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/api/stuff', stuffRoutes);
app.use('/api/products', productRoutes);

export default app;