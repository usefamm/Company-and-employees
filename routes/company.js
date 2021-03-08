const express = require("express");

const router = express.Router();
const employee = require("../models/employee");
const Company = require("../models/company");

//showing companies UI
router.get("/companiesPage", (req, res) => {
  Company.find(
    {},
    {
      __v: 0,
    },
    {
      lean: true,
    },
    (err, companies) => {
      if (err)
        return res.status(500).json({
          msg: "Server Error :)",
          err: err.message,
        });

      let list = Object.keys(companies[0]);

      res.render("company", {
        list,
        companies,
      });
    }
  );
});
//showing between two  dates
router.post("/companiesPage", (req, res) => {
  if (req.body.submit === "" || req.body.end === "") {
    Company.find(
      {},
      {
        __v: 0,
      },
      {
        lean: true,
      },
      (err, companies) => {
        if (err)
          return res.status(500).json({
            msg: "Server Error :)",
            err: err.message,
          });

        let list = Object.keys(companies[0]);

        res.render("company", {
          list,
          companies,
        });
      }
    );
  } else {
    
    let begin_date = new Date(req.body.start);
    let end_date = new Date(req.body.end);

    Company.find(
      {
        SubmitDate: {
          $lte: end_date,
          $gte: begin_date,
        },
      },
      {
        __v: 0,
      },
      {
        lean: true,
      },
      (err, companies) => {
        if (err)
          return res.status(500).json({
            msg: "Server Error :)",
            err: err.message,
          });
        if (companies.length === 0) {
          res.render("error", {
            message: "something went wrong",
            status: 404,
            stack: "",
          });
        } else {
          let list = Object.keys(companies[0]);

          res.render("company", {
            list,
            companies,
          });
        }
      }
    );
  }
});


//Create
router.put("/", (req, res) => {
  const newCompany = new Company({
    name: req.body.name,

    submitNumber: req.body.submitNumber,

    Town: req.body.Town,

    City: req.body.City,

    SubmitDate: req.body.SubmitDate,

    Phone: req.body.Phone,
  });

  newCompany.save((err, company) => {
    if (err)
      return res.status(500).json({
        msg: "Server Error :)",
        err: err.message,
      });
    res.json(company);
  });
});



//Delete table
router.delete("/delete/:id", (req, res) => {
  Company.deleteOne(
    {
      _id: req.params.id,
    },
    (err, company) => {
      if (err)
        return res.status(500).json({
          msg: "Server Error :)",
          err: err.message,
        });
      res.json({
        company,
        msg: "success",
      });
    }
  );
});

//Update table
router.post("/update", (req, res) => {
  Company.findOneAndUpdate(
    {
      _id: req.body._id,
    },
    req.body,
    {
      new: true,
    },
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
//read table
router.get("/:id", (req, res) => {
  Company.findOne(
    {
      _id: req.params.id,
    },
    "",
    {
      lean: true,
    },
    (err, info) => {
      if (err)
        return res.status(500).json({
          msg: "Wrong inputs",
          err: err.message,
        });
      employee.find(
        {
          Company_id: info._id,
        },
        "",
        {
          lean: true,
        },
        (err, employees) => {
          if (err)
            return res.status(500).json({
              msg: "Wrong inputs",
              err: err.message,
            });
          if (employees.length === 0) {
            res.render("error", {
              message: "No Employee Found For This Company",
              status: 404,
              stack: "",
            });
          } else {
            let list = Object.keys(employees[0]);

            res.render("employee", {
              employees,
              list,
              info,
            });
          }
        }
      );
    }
  );
});

module.exports = router;
