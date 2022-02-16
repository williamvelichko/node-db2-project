const db = require("./../../data/db-config");
const { get } = require("./cars-router");

const getAll = () => {
  // DO YOUR MAGIC
  return db("cars");
};

const getById = async (id) => {
  // DO YOUR MAGIC
  const result = await db("cars").where("id", id).first();
  return result;
};

const create = async (car) => {
  // DO YOUR MAGIC
  const [id] = await db("cars").insert(car);
  return getById(id);
};

const updateById = async (id, car) => {
  let results = await db("cars")
    .where("id", id)
    .update(
      "make",
      car.make,
      "model",
      car.model,
      "vin",
      car.vin,
      "mileage",
      car.mileage,
      "title",
      car.title,
      "transmission",
      car.transmission
    );

  return getById(id);
};

const remove = async (id) => {
  return db("cars").where("id", id).del();
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  remove,
};
