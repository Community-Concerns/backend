
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tickets').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('tickets').insert([
        {user_id: 1, title: 'pothole', description: "This is a pothole at the intersection of 7th and Cascade"},
        {user_id: 2, title: 'graffiti', description: "There is graffiti on the wall near exit 45 on route 20"},
        {user_id: 3, title: 'abandoned property', description: "Kids frequent this abandoned property and I'm afraid someone will get hurt"}
      ]);
    });
};
