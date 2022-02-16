const car = require("./cars-model");
const db = require("./../../data/db-config");
const vin = require("vin-validator");
const checkCarId = (req, res, next) => {
  // DO YOUR MAGIC
  car.getById(req.params.id).then((car) => {
    if (car.length === 0) {
      res
        .status(404)
        .json({ message: `car with id <${req.params.id}> is not found ` });
    } else {
      next();
    }
  });
};

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { make, model, mileage, vin, title, transmission } = req.body;

  if (!make) return res.status(400).json({ message: "make is missing" });
  if (!model) return res.status(400).json({ message: "model is missing" });
  if (!mileage) return res.status(400).json({ message: "mileage is missing" });
  if (!vin) return res.status(400).json({ message: "vin is missing" });
  next();

  // if (model == null) {
  //     res.status(400).json({ message: `model is missing` });
  //   } else if (mileage == null) {
  //     res.status(400).json({ message: `mileage is missing` });
  //   } else if (vin == null) {
  //     res.status(400).json({ message: `vin is missing` });
  //   } else {
  //     next();
  //}
};

const checkVinNumberValid = async (req, res, next) => {
  // DO YOUR MAGIC
  //const { vin } = req.body;
  if (vin.validate(req.params.vin)) {
    next();
  } else {
    res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const result = await db("cars").where("vin", req.body.vin.trim()).first();
    if (result) {
      res.status(400).json({ message: `vin ${req.body.vin} already exists` });
    } else {
      next();
    }
  } catch (e) {
    next(e);
  }
  // DO YOUR MAGIC
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
};
