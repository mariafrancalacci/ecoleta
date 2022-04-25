import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('items', table =>{
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('title').notNullable();
        });
    //Criar a tabela
}
// serve para  realizar as alterações que precisamos no banco 
export async function down (knex: Knex ) {
    return knex.schema.dropTable('items');
    //serve para voltaratras ou seja deletar
}