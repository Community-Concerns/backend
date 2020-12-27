
exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments("id"); 
    tbl.string("username", 50).notNullable()
<<<<<<< HEAD
    tbl.string("email", 255).notNullable().unique();
    tbl.string("password", 255).notNullable();
    tbl.string("zipcode", 5).notNullable()
  })
  .createTable("tickets", tbl => {
    tbl.increments("id");
=======
    tbl.string("email", 255).notNullable().unique(); 
    tbl.string("password", 255).notNullable(); 
    tbl.string("zipcode", 5).notNullable()

  })
  .createTable("tickets", tbl => {
    tbl.increments("id")
>>>>>>> 75893c8e4bb0e8060134c0c19fa324b80042fc3b
    tbl.integer("user_id")
    .unsigned()
    .notNullable()
    .references("id")
    .inTable("users"); 
    tbl.string("title", 255).notNullable(); 
<<<<<<< HEAD
    tbl.string("description", 255).notNullable();
    tbl.string("zipcode", 5).notNullable()
=======
    tbl.string("description", 255).notNullable(); 
    tbl.string("zipcode", 5).notNullable()

>>>>>>> 75893c8e4bb0e8060134c0c19fa324b80042fc3b
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
  .createTable("ticket_images", tbl => {
    tbl.increments("id"); 
    tbl.integer("ticket_id")
    .unsigned()
    .notNullable()
    .references("id")
    .inTable("tickets");
    tbl.string("image_url", 255).notNullable(); 
    tbl.string("public_id", 255).notNullable(); 
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("ticket_images")
  .dropTableIfExists("comments")
  .dropTableIfExists("ticket_upvotes")
  .dropTableIfExists("tickets")
  .dropTableIfExists("users")
};
