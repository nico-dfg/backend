import express, { Request, Response, NextFunction } from "express";

import Thing from "../models/thing";


const router = express.Router();

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
});
  
router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
});
  
router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
});
  
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
});  

export default router;