exports.up = function(knex) {
    knex.schema.createTable('incidents', function (table) {
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('value').notNullable();

        table.string('ong_id').notNullable(); //relacionamento com tabela de ongs

        table.foreign('ong_id').references('id').inTable('ongs') // chave estrageira
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('incidents');
    
  };
  