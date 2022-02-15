const car = require("./cars-model");
const db = require("./../../data/db-config");
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

  if (make == null) {
    res.status(400).json({ message: `make is missing` });
  } else if (model == null) {
    res.status(400).json({ message: `model is missing` });
  } else if (mileage == null) {
    res.status(400).json({ message: `mileage is missing` });
  } else if (vin == null) {
    res.status(400).json({ message: `vin is missing` });
  } else {
    next();
  }
};

const checkVinNumberValid = async (req, res, next) => {
  // DO YOUR MAGIC
  //const { vin } = req.body;
  try {
    const result = await db("cars").where("vin", req.body.vin.trim()).first();
    if (result) {
      res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
    } else {
      next();
    }
  } catch (e) {
    next(e);
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
