
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('ticket_upvotes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('ticket_upvotes').insert([
        {user_id: 1, ticket_id: 1},
        {user_id: 2, ticket_id: 1},
        {user_id: 3, ticket_id: 2}
      ]);
    });
};
