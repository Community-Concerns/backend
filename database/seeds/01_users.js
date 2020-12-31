
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: "james", email: 'james@gmail.com', password: "password"},
        {username: "mike", email: 'mike@gmail.com', password: "password"},
        {username: "tim", email: 'tim@gmail.com', password: "password"}
      ]);
    });
};
