const EntitySchema = require("typeorm").EntitySchema;

const employee= new EntitySchema({
  name: "employee1",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    name: {
      type: "varchar",
      nullable: false,
    },
    salary_grade: {
      type: "varchar",
      nullable: true,
    },
    designation: {
      type: "varchar",
      nullable: true,
    },
  },
});

module.exports = { employee};
