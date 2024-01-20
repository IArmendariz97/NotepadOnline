const Notes = require("./NotesModel/notesModel");
const Users = require("./UserModel/userModel");
const Categories = require("./CategoryModel/categoryModel");

Users.hasMany(Notes);
Notes.belongsTo(Users);

Notes.belongsToMany(Categories, { through: "NoteCategory" });
Categories.belongsToMany(Notes, { through: "NoteCategory" });
