const { dataSource } = require("../../database");
const grades = require("./../entity/grades");
const employee = require("./../entity/emp");
//const employeeRepo = require("./../controller/empController");
const { Between, LessThanOrEqual, MoreThanOrEqual, Not, IsNull } = require("typeorm");
const gradeRepo = dataSource.getRepository("grades");
const empRepo = dataSource.getRepository("employee1");
const empAbove = dataSource.getRepository("aboveGrade");

const save1 = async (req, res) => {
  try {
    const resp = await gradeRepo.save(req.body);
    console.log(resp);
    res.send(resp);
  } catch (error) {
    console.log(error.message);
  }
};

const get1 = async (req, res) => {
  try {
    const resp = await gradeRepo.find();
    console.log(resp);
    const salary = req.body.salary;
  } catch (error) {
    console.log(error.message);
  }
};

const add1 = async (req, res) => {
  try {
    console.log(req.body);
    let salary = req.body.salary;
    console.log(req.body);
    delete req.body.salary;

       //check condition for A or B
       //TASK3

    const con = await gradeRepo.findOne({
      select:{
        grades:true,
      },
      where: {
        min: LessThanOrEqual(salary),
        max: MoreThanOrEqual(salary),
      },
    });
    console.log(con);
    req.body["salary_grade"] = con.grades;
    console.log(req.body);
    let resp = await empRepo.save(req.body);
    
    console.log(resp);
   

    if(resp.salary_grade == "A" || resp.salary_grade == "B")
    {
      await empAbove.save({ empid: resp.id, name: resp.name})
    }
    res.send(resp);


//task2
//check condition for A and B
const con2 = await gradeRepo.findOne({
  select:{
    grades:true,
  },
  where: {
    min: LessThanOrEqual(salary),
    max: MoreThanOrEqual(salary),
  },
});
console.log(con2);
req.body["salary_grade"] = con2.grades;
console.log(req.body);
let resp2 = await empRepo.save(req.body);

console.log(resp2);


if(resp2.salary_grade == "A" && resp2.salary_grade == "B")
{
  await empAbove.save({ empid: resp2.id, name: resp2.name})
}
res.send(resp2);

//task3
const con1 = await gradeRepo.findOne({
  select:{
    name:true,
  },
  where: {
    min: LessThanOrEqual(salary),
    max: MoreThanOrEqual(salary),
  },
});

console.log(con1);
req.body["salary_grade"] = con1.grades;
console.log(req.body);
let resp1 = await empRepo.save(req.body);

console.log(resp1);


if(resp1.salary_grade == "A" && resp1.salary_grade == "B")
{
  await empAbove.save({ empid: resp1.id, name: resp1.name})
}
res.send(resp1);



    //post process
    //task1
    // const con = await gradeRepo.findOne({
    //   select:{
    //     grades:true,
    //   },
    //   where: {
    //     min: LessThanOrEqual(salary),
    //     max: MoreThanOrEqual(salary),
    //   },
    // });
    // console.log(con);
    // req.body["salary_grade"] = con.grades;
    // console.log(req.body);
    // let resp = await empRepo.save(req.body);
    
    // console.log(resp);
    // if (resp.salary_grade <= "C") {
    //   await empAbove.save({ empid: resp.id, name: resp.name });
    // }
    // res.send(resp);

 
    
  } catch (error) {
    console.log(error.message);
  }
};

// substring search on a string field in DB
const getSubStringItem = async (req, res) => {
  try {
    const item = req.body.item;

    const resp = await empRepo.findBy({
      name: Like(`${item}%`),
    });
    console.log(resp);
    res.send(resp);
  } catch (error) {
    console.log(error.message);
  }
};



//check if a field in DB has a value or not.

const isExists = async (req, res) => {
  try {
   

    const resp = await gradeRepo.find({
      where: {
        grades:Not(IsNull())
      }
      
    });
    console.log(resp);
    res.send(resp);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { save1, get1, add1,getSubStringItem,isExists };























    // const con = await gradeRepo.findOne({
    //   where: {
    //     min: LessThanOrEqual(salary),
    //     max: MoreThanOrEqual(salary),
    //   },
    // });

    // if (salary >= grades.min && salary <= grades.max) {
    //   let resp = await empRepo.save(req.body);
    //   //console.log("helo          "+element["grades"])
    //   console.log(resp);
    //   //post process
    //   if (resp.salary_grade <= "C") {
    //     await empAbove.save({ empid: resp.id, name: resp.name });
    //   }
    //   res.send(resp);
    // }