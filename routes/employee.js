const express = require("express");
const Router = express.Router();
const employee = require("../models/employee");

//create
Router.put("/", (req, res) => {
  const newEmployee = new employee({
    name: req.body.name,

    familyName: req.body.familyName,

    Code: req.body.Code,

    Gender: req.body.Gender,

    Manager: req.body.Manager,

    birthDay: req.body.birthDay,

    Company_id: req.body.Company_id,
  });

  newEmployee.save((err, employee) => {
    if (err)
      return res.status(500).json({
        msg: "Wrong INputs",
        err: err.message,
      });
    res.json(employee);
  });
});

//Update
Router.post("/update", (req, res) => {
  employee.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, info) => {
      if (err)
        return res.status(500).json({
          msg: "Wrong inputs",
          err: err.message,
        });
      res.json(info);
    }
  );
});

//Delete
Router.delete("/delete/:id", (req, res) => {
  employee.deleteOne(
    {
      _id: req.params.id,
    },
    (err, employee) => {
      if (err)
        return res.status(500).json({
          msg: "Server Error :)",
          err: err.message,
        });
      res.json({
        employee,
        msg: "success",
      });
    }
  );
});

module.exports = Router;
