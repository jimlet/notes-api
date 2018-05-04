const noteRoutes = require('./note_routes');

module.exports = (app, db, collection) => {
  noteRoutes(app, db, collection);
  // Other route groups in the future go here.
};
