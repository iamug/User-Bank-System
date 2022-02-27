const { onInsertTrigger } = require('../../knexfile');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.string('name').notNullable();
      table.string('email').notNullable().unique().index();
      table.decimal('balance', 30, 2).defaultTo(0);
      table.boolean('isEnabled').defaultTo(true);
      table.timestamps(true, true, true);
      table.uuid('userId').notNullable().unique().index();
      table.increments('id');
      table.primary(['userId']);
    })
    .createTable('transactions', (table) => {
      table.uuid('transactionId');
      table.increments('id');
      table.uuid('user');
      table.decimal('amount', 30, 2).notNullable();
      table.string('type').checkIn(['CREDIT', 'DEBIT']).notNullable();
      table.datetime('datetime', { precision: 6 }).defaultTo(knex.fn.now(6));
      table.timestamps(true, true, true);
      table.primary(['transactionId']);
      table.foreign('user').references('users.userId').onDelete('SET NULL');
    })
    .then(() => knex.raw(onInsertTrigger('users', 'userId')))
    .then(() => knex.raw(onInsertTrigger('transactions', 'transactionId')));
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users').dropTable('transactions');
};
