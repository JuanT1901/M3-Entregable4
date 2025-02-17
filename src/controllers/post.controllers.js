const catchError = require("../utils/catchError");
const Post = require("../models/Post");

const getAll = catchError(async (req, res) => {
  const { id } = await req.user;
  const results = await Post.findAll({ where: { userId: id } });
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const user = req.user;
  const result = await Post.create({ ...req.body, userId: user.id });
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Post.findByPk(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const result = await Post.destroy({ where: { id }, userId: user.id });
  if (!result) return res.sendStatus(404);
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const result = await Post.update(req.body, {
    where: { userId: id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
};
