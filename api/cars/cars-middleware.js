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
  if (!make || !model || !mileage || !vin) {
    res
      .status(400)
      .json({ message: `${(make, model, mileage, vin)} is missing` });
  }
};

const checkVinNumberValid = async (req, res, next) => {
  // DO YOUR MAGIC
  //const { vin } = req.body;
  try {
    let result = await db("cars").where("vin", req.body.vin.trim()).first();
    if (result) {
      res.status(400).json({ message: ` vin ${vin} is invalid` });
    } else {
      next();
    }
  } catch (e) {
    next(e);
  }
};

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
};
