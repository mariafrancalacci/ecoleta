import knex from '../database/connection';
import { Request, Response} from 'express';


class PointsController {
    async index (request: Request, response: Response) {
        const { city, uf, items} = request.query;

        const parsedItems =String(items)
        .split(',')
        .map(item => Number(item.trim()));

        const points = await knex('points')
        .join('point_itens', 'points_id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(city))
        .distinct()
        .select('points.*');

        return response.json(points);
    }

    async show(request: Request, response: Response) {
        //const id = request.params.id ;
        const { id } = request.params; //recebendo o id aqui

        const point = await knex('points').where('id', id).first();

        if (!point){
            return response.status(400).json ({ message: 'Point not found'});
        }

        //listar os itens que tem relação com esse ponto de coleta
        //relacionando point items com items id
        // onde items.id seja igual ...
        //where = onde point_items.point_id seja igual ao id que a gente ta recebendo la em cima
        const items = await knex('items')
            .join('point_items', 'item.id', '=', 'point_items.item_id')  
            .where('point_items.point_id', id)
            .select('items.title');

        return response.json(point);
    }

    //colocar os metodos aqui dentro
    async create (request: Request, response: Response) {
        //desestruturar JS
         const {
             name, 
             email,
             whatsapp,
             latitude,
             longitude,
             city,
             uf,
             items
         } = request.body;
     
         const trx = await knex.transaction();

         const point = {
            image: request.file?.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
         };
     
         // sintaxe incurtada ex: name:name, qunado o nome da variavel é o mesmo da prorpeidade da pra omitir
         //criação do ponto 
         const insertedIds = await knex('points').insert(point);
     
         const point_id = insertedIds[0];
     
         const pointItems = items
         .slipt(',')
         .map((item: string) => Number (item.trim()))
         .map((item_id: number) => {
             return {
                 item_id,
                 point_id,
             };
         });
     
     
         await knex('point_items').insert(pointItems);

         await trx.commit();
         //realmente vai fazer o insert na base de dados
     
         return response.json({
             id: point_id,
             ...point
          })
     
     }
};


export default PointsController;

    // filtro de cidade,uf, items ( query parrms), porque aundo a gente vai lidar com filros a gente usa filtro // o request parms é o obrigatorio na rota por isso nao vamos usar agr// o request body a gente só usa para a criação e edição