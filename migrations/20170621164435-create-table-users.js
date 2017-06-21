exports.up = function(db) {
  return db.runSql(`
    CREATE TABLE "Users" (
      "UserID" varchar PRIMARY KEY,
      "UserProfile" varchar
    )
  `);
};

exports.down = function(db) {
  return db.runSql('DROP TABLE "Users"');
};
