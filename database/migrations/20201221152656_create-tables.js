
exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments("id"); 
    tbl.string("username", 50).notNullable()
    tbl.string("email", 255).notNullable().unique(); 
    tbl.string("password", 255).notNullable(); 
    tbl.string("zipcode", 5).notNullable()
  })
  .createTable("tickets", tbl => {
    tbl.increments("id")
    tbl.integer("user_id")
    .unsigned()
    .notNullable()
    .references("id")
    .inTable("users"); 
    tbl.string("title", 255).notNullable(); 
    tbl.string("description", 255).notNullable(); 
    tbl.string("zipcode", 5).notNullable()
    tbl.string("image")
  })
  .createTable("ticket_upvotes", tbl => {
    tbl.increments("id"); 
    tbl.integer("user_id")
    .unsigned()
    .notNullable()
    .references("id")
    .inTable("users");
    tbl.integer("ticket_id")
    .unsigned()
    .notNullable()
    .references("id")
    .inTable("tickets");
  })
  .createTable("comments", tbl => {
    tbl.increments("id"); 
    tbl.string("comment", 255).notNullable(); 
    tbl.integer("ticket_id")
    .unsigned()
    .notNullable()
    .references("id")
    .inTable("tickets")
    .onDelete("CASCADE")
    tbl.integer("user_id")
    .unsigned()
    .notNullable()
    .references("id")
    .inTable("users");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("comments")
  .dropTableIfExists("ticket_upvotes")
  .dropTableIfExists("tickets")
  .dropTableIfExists("users")
};
