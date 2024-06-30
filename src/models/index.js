const Post = require("./Post");
const User = require("./User");

Post.belongsTo(User);
User.hasMany(Post);

Post.belongsToMany(User, {through: "favorites"});
User.belongsToMany(Post, {through: "favorites"})