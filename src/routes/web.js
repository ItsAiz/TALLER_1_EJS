const express = require("express");
const path = require("path");
const service = require("../services/loginService");
const serviceCustomerManagement = require("../services/customerManagementService");
const serviceEmployeeManagement = require("../services/employeeManagementService");
const serviceBook = require("../services/createBookService");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("login");
});

router.get("/admin", (req, res) => {
  res.render("templates/dashBoard_template");
});

router.post("/login/validateUser", service.validateLogin);

router.get("/dashBoard", (req, res) => {
  req.session = req.session || {};
  const rol = req.session.data;
  const username = req.session.username;

  if (rol) {
    res.render("./templates/dashBoard_template", {
      data: rol,
      username: username,
    });
  } else {
    res.redirect("/");
  }
});

router.get("/dashBoard/EmployeeManagement", (req, res) => {
  req.session = req.session || {};
  const rol = req.session.data;
  const username = req.session.username;
  const employeesData = serviceEmployeeManagement.getEmployeeData();

  if (rol) {
    res.render("./admin/employeeManagement", {
      data: rol,
      username: username,
      employees: employeesData,
    });
  } else {
    res.redirect("/");
  }
});

router.get("/dashBoard/customersManagement", (req, res) => {
  const rol = req.session.data;
  console.log(rol);
  const username = req.session.username;
  const customersData = serviceCustomerManagement.getCustomerData();
  if (rol) {
    res.render("./employee/customerManagement", {
      data: rol,
      username: username,
      customers: customersData,
    });
  } else {
    res.redirect("/");
  }
});

router.get("/dashBoard/bookManagement", (req, res) => {
  const rol = req.session.data;
  console.log(rol);
  const username = req.session.username;
  const bookData = serviceBook.getBookData();
  if (rol) {
    res.render("./admin/bookManagement", {
      data: rol,
      username: username,
      books: bookData,
    });
  } else {
    res.redirect("/");
  }
});

router.get("/dashboard/registerCustomer", (req, res) => {
  const rol = req.session.data;
  const username = req.session.username;
  if (rol) {
    res.render("./employee/registerCustomerManagement", {
      data: rol,
      username: username,
    });
  } else {
    res.redirect("/");
  }
});

router.get("/dashboard/registerEmployee", (req, res) => {
  const rol = req.session.data;
  const username = req.session.username;
  if (rol) {
    res.render("./admin/createEmployeeManagement", {
      data: rol,
      username: username,
    });
  } else {
    res.redirect("/");
  }
});

router.get("/dashBoard/createBookManagement", (req, res) => {
  req.session = req.session || {};
  const rol = req.session.data;
  const username = req.session.username;
  if (rol) {
    res.render("./admin/createBookManagement", {
      data: rol,
      username: username,
    });
  } else {
    res.redirect("/");
  }
});

router.get("/dashBoard/createEmployee", (req, res) => {
  req.session = req.session || {};
  const rol = req.session.data;
  const username = req.session.username;
  if (rol) {
    res.render("./admin/createEmployeeManagement", {
      data: rol,
      username: username,
    });
  } else {
    res.redirect("/");
  }
});

router.get("/dashboard/registerLoan", (req, res) => {
  const rol = req.session.data;
  const username = req.session.username;
  const bookData = serviceBook.getBookData();
  const customersData = serviceCustomerManagement.getCustomerData();
  if (rol) {
    res.render("./employee/registerLoanCustomerManagement", {
      data: rol,
      username: username,
      bookData: bookData,
      customers: customersData,
    });
  } else {
    res.redirect("/");
  }
});
router.get("/dashBoard/loansHistoryManagement", (req, res) => {
  const rol = req.session.data;
  const username = req.session.username;
  const customersData =
    serviceCustomerManagement.getCustomerDataUnique(username);
  if (rol) {
    res.render("./customer/loansHistoryManagement", {
      data: rol,
      username: username,
      customer: customersData,
    });
  } else {
    res.redirect("/");
  }
});

router.get("/dashBoard/loansManagement", (req, res) => {
  const rol = req.session.data;
  const username = req.session.username;
  const customersData = serviceCustomerManagement.getCustomerData();
  if (rol) {
    res.render("./employee/loanManagement", {
      data: rol,
      username: username,
      customers: customersData,
    });
  } else {
    res.redirect("/");
  }
});

router.get("/dashBoard/loansPendingManagement", (req, res) => {
  const rol = req.session.data;
  const username = req.session.username;
  const customersData =
    serviceCustomerManagement.getCustomerDataUnique(username);
  if (rol) {
    res.render("./customer/loansPendingManagement", {
      data: rol,
      username: username,
      customer: customersData,
    });
  } else {
    res.redirect("/");
  }
});

router.post(
  "/dashBoard/loansManagement/changeStatus/:username/:id",
  serviceCustomerManagement.updateStatus
);

router.post(
  "/dashboard/customersManagement/edit",
  serviceCustomerManagement.updateCustomer
);

router.post(
  "/dashboard/registerCustomer/register",
  serviceCustomerManagement.registerCustomer
);

router.post(
  "/dashboard/registerEmployee/register",
  serviceEmployeeManagement.registerEmployee
);

router.delete(
  "/dashboard/customersManagement/delete/:username",
  serviceCustomerManagement.deleteCustomer
);

router.post(
  "/dashboard/registerLoan/register",
  serviceCustomerManagement.registerLoan
);

router.post(
  "/dashboard/employeeManagement/edit",
  serviceEmployeeManagement.updateEmployee
);
router.delete(
  "/dashboard/employeeManagement/delete/:username",
  serviceEmployeeManagement.deleteEmployee
);

router.post("/book/createBook", serviceBook.createBook);
router.delete("/dashboard/booksManagement/delete/:id", serviceBook.deleteBook);
router.post("/dashboard/bookManagement/edit", serviceBook.updateBook);
module.exports = router;
