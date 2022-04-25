import knex from '../database/connection';
import { Request, Response} from 'express';

// index se usa para listagem e como essa tabela é uma listagem de itens se da esse nome a função async

class ItemsController {
    async index (request: Request, response:Response) {
        const items = await knex('items').select('*');
        //buscar todos os campos da tabela items // usamos uma aquery
    
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://localhost:3333/uploads/${item.image}`,
            };
        });
        // processo de serialização é quando as informações do banco nao exatamente como você queria/cliente, entao essa  mudança é chamada de serialização
        return response.json(serializedItems);
    }
};

export default ItemsController;