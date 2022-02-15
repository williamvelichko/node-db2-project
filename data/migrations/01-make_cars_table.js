exports.up = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.createTable("cars", (tbl) => {
    tbl.increments();
    tbl.string("vin", 128).unique().notNullable();
    tbl.string("make", 128).notNullable();
    tbl.string("model", 128).notNullable();
    tbl.decimal("mileage").notNullable();
    tbl.string("title", 128).defaultTo("yes");
    tbl.string("transmission", 128).defaultTo("yes");
  });
};

exports.down = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.dropTableIfExists("cars");
};
