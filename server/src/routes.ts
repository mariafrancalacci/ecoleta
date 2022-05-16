import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';



const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController =  new ItemsController();

// quero pegar uma lista de items 
//rota de CRIAÇÃO de um ponto de coleta se usa POST
routes.get('/items', itemsController.index);
routes.get('/points/:id', pointsController.show);
routes.get('/points', pointsController.index);

routes.post('/points', upload.single('image') ,pointsController.create);

export default routes; 



//nomes: index, show, create//store , update, delete//destroy
// show se refere a listar um unico elemento