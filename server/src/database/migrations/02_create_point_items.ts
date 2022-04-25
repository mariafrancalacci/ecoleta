import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('point_items', table =>{
        table.increments('id').primary();

        //esse campo 'point id' vai criar uma chave estrangeira na tabela points e no campo Id
        //então todo ponto id que estiver dentro dessa tabela precisa ser um ID valido dentro da tabela points
        table.integer('point_id')
        .notNullable()
        .references('id')
        .inTable('points');

        table.integer('item_id')
        .notNullable()
        .references('id')
        .inTable('items');
        });
    //Criar a tabela
}
// serve para  realizar as alterações que precisamos no banco 
export async function down (knex: Knex ) {
    return knex.schema.dropTable('point_items');
    //serve para voltaratras ou seja deletar
}