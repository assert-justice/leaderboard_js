/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('records', (table) => {
        table.increments('record_id').primary();
        table.integer('game_id').references('games.game_id').notNullable().onDelete('CASCADE');
        table.string('player_name').notNullable();
        table.double('player_score').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('records');
};
