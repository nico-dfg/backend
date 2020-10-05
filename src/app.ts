import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import {DATABASE_USER, DATABASE_PASSWORD} from "./secret";
import Thing from "./models/thing";
import Product from "./models/product";

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

// Stuff routes

app.post('/api/stuff', (req: Request, res: Response, next: NextFunction) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/stuff/:id', (req: Request, res: Response, next: NextFunction) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});

app.put('/api/stuff/:id', (req: Request, res: Response, next: NextFunction) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});

app.delete('/api/stuff/:id', (req: Request, res: Response, next: NextFunction) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});

app.use('/api/stuff', (req: Request, res: Response, next: NextFunction) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});

// Product routes

app.get('/api/products/:id', (req: Request, res: Response, next: NextFunction) => {
  Product.findOne({ _id: req.params.id })
    .then(product => res.status(200).json({product: product}))
    .catch(error => res.status(404).json({ error }));
});

app.post('/api/products', (req: Request, res: Response, next: NextFunction) => {
  delete req.body._id;
  const product = new Product({
    ...req.body
  });
  product.save()
    .then(product => res.status(201).json({ product: product }))
    .catch(error => res.status(400).json({ error }));
});

app.put('/api/products/:id', (req: Request, res: Response, next: NextFunction) => {
  Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Modified!'}))
    .catch(error => res.status(400).json({ error }));
});

app.delete('/api/products/:id', (req: Request, res: Response, next: NextFunction) => {
  Product.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Deleted!'}))
    .catch(error => res.status(400).json({ error }));
});

app.use('/api/products', (req: Request, res: Response, next: NextFunction) => {
  Product.find()
    .then(products => res.status(200).json({products: products}))
    .catch(error => res.status(400).json({ error }));
});

export default app