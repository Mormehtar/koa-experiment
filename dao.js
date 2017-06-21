class DAO {
  constructor(db) {
    this.db = db;
  }

  createUser(UserId) {
    return this.db.query(DAO.queries.createUser, [UserId]).then(result => !!(result && result.length));
  }

  updateUser(UserId, UserProfile) {
    return this.db.query(DAO.queries.updateUser, [UserId, UserProfile]).then(result => !!(result && result.length));
  }

  getUserProfile(UserId) {
    return this.db.oneOrNone(DAO.queries.getUserProfile, [UserId]);
  }
}

DAO.queries = {
  createUser: `INSERT INTO "Users" ("UserID") VALUES ($1) ON CONFLICT DO NOTHING RETURNING "UserID";`,
  updateUser: `UPDATE "Users" SET "UserProfile" = $2 WHERE "UserID" = $1 RETURNING "UserID";`,
  getUserProfile: `SELECT "UserProfile" FROM "Users" WHERE "UserID" = $1;`
};

module.exports = DAO;