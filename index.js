const express = require("express");
const expressEjsLayout = require("express-ejs-layouts");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const mongodb = require("mongodb");
const MongoStore = require("connect-mongo");

const app = express();

app.set("view engine", "ejs");

app.use(expressEjsLayout);

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(cookieParser("azril"));

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://admin:poyEDNvZ7aJyO5n7@sekolah-app.adlep.mongodb.net/?retryWrites=true&w=majority",
    }),
    secret: "azril",
    saveUninitialized: false,
    resave: true,
  })
);

app.get("/login", (req, res) => {
  if (req.session.login) {
    res.redirect("/");
    return true;
  }
  res.render("login", {
    layout: "layout/template",
  });
});

app.post("/postLogin", (req, res) => {
  if (req.body.password == "NjKS982Jhsd@#") {
    req.session.login = "user";
    res.redirect("/");
  }
});

app.get("/logout", (req, res) => {
  req.session.login = null;
  req.session.destroy();
  res.redirect("/login");
});

app.use((req, res, next) => {
  if (req.session.login) {
    next();
  } else {
    res.redirect("/login");
  }
});
const dashboardRoutes = require("./app/routes/DashboardRoutes");

app.use("/", dashboardRoutes);

app.use("/", (req, res) => {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Connect 3000");
});
