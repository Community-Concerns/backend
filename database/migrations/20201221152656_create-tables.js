
exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {

  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users")
};
