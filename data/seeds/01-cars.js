// STRETCH

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("cars").truncate();
  return knex("cars").insert([
    {
      make: "porsche",
      model: "911",
      vin: "111111",
      mileage: 199,
      title: "cali",
      transmission: "manual",
    },
    {
      make: "chevy",
      model: "corvette",
      vin: "000000",
      mileage: 1000,
      title: "cali",
      transmission: "manual",
    },
    {
      make: "toyota",
      model: "tacoma",
      vin: "222222",
      mileage: 10,
      title: "cali",
      transmission: "manual",
    },
  ]);
};
