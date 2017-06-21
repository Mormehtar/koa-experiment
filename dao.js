class DAO {
  constructor(db) {
    this.db = db;
  }

  createUser(UserId) {
    return this.db.query(DAO.queries.createUser, [UserId]).then(result => !!(result && result.length));
  }
}

DAO.queries = {
  createUser: `INSERT INTO "Users" ("UserID") VALUES ($1) ON CONFLICT DO NOTHING RETURNING "UserID";`
};

module.exports = DAO;