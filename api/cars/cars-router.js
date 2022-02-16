// DO YOUR MAGIC
const cars = require("./cars-model");
const router = require("express").Router();
const mid = require("./cars-middleware");

router.get("/", (req, res) => {
  cars
    .getAll()
    .then((cars) => {
      res.json(cars);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", mid.checkCarId, (req, res) => {
  cars
    .getById(req.params.id)
    .then((car) => {
      res.json(car);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post(
  "/",
  mid.checkCarPayload,
  mid.checkVinNumberUnique,
  mid.checkVinNumberValid,
  (req, res) => {
    const body = req.body;
    cars
      .create(body)
      .then((newCar) => {
        res.json(newCar);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

router.put(
  "/:id",
  mid.checkCarId,
  mid.checkVinNumberUnique,
  mid.checkCarPayload,
  mid.checkVinNumberValid,
  (req, res) => {
    cars
      .updateById(req.params.id, req.body)
      .then((updated) => {
        res.json(updated);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

router.delete("/:id", mid.checkCarId, (req, res) => {
  cars
    .remove(req.params.id)
    .then((cars) => {
      res.json(req.car);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
