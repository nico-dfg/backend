import express, { Request, Response, NextFunction } from "express";

import Product from "../models/product";

const router = express.Router();

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    Product.findOne({ _id: req.params.id })
        .then(product => res.status(200).json({product: product}))
        .catch(error => res.status(404).json({ error }));
});
  
router.post('/', (req: Request, res: Response, next: NextFunction) => {
    delete req.body._id;
    const product = new Product({
        ...req.body
    });
    product.save()
        .then(product => res.status(201).json({ product: product }))
        .catch(error => res.status(400).json({ error }));
});
  
router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
    Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Modified!'}))
        .catch(error => res.status(400).json({ error }));
});
  
router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
    Product.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Deleted!'}))
        .catch(error => res.status(400).json({ error }));
});
  
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    Product.find()
        .then(products => res.status(200).json({products: products}))
        .catch(error => res.status(400).json({ error }));
});

export default router;