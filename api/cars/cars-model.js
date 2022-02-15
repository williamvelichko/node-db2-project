const db = require("./../../data/db-config");
const { get } = require("./cars-router");

const getAll = () => {
  // DO YOUR MAGIC
  return db("cars");
};

const getById = (id) => {
  // DO YOUR MAGIC
  return db("cars").where({ id: id });
};

const create = async (car) => {
  // DO YOUR MAGIC
  const [id] = await db("cars").insert(car);
  return getById(id);
};

module.exports = {
  getAll,
  getById,
  create,
};
