const EntitySchema = require("typeorm").EntitySchema;

const aboveGrades = new EntitySchema({
  name: "aboveGrade",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated:true
    },
    empid: {
      type: "varchar",
    },

    name: {
      type: "varchar",
    },
  },
});
module.exports = { aboveGrades };
