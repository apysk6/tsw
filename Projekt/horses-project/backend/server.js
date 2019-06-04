/* eslint-disable no-console */
/*jshint node: true, esversion: 6 */
"use strict";

const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = require("express")();
const uniqid = require("uniqid");

// Session config.
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const sessionStore = new RedisStore({
  host: "127.0.0.1",
  port: 6379,
  client: require("redis").createClient(),
  ttl: 260
});

// Passport.js
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// Socket.io (wraz z modułem autoryzacji poprzez Passport)
const socketIo = require("socket.io");
const passportSocketIo = require("passport.socketio");

// Konfiguracja passport.js
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new LocalStrategy((username, password, done) => {
    if (username === "admin" && password === "tajne") {
      console.log("Udane logowanie...");
      return done(null, {
        username: username,
        password: password
      });
    } else {
      return done(null, false);
    }
  })
);

// Database config.
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({ sedziowie: [], klasy: [] }).write();
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(cors({ credentials: true, origin: "http://localhost:8080" }));
app.use(express.static("public"));

// konfiguracja obsługi sesji (poziom Express,js)
const sessionSecret = "Wielki$ekret44";
const sessionKey = "express.sid";
app.use(
  session({
    key: sessionKey,
    secret: sessionSecret,
    store: sessionStore,
    resave: false,
    saveUninitialized: true
  })
);

// middleware Passport.js
app.use(passport.initialize());
app.use(passport.session());
// obsługa zasobów statycznych
app.use(express.static("public"));

app.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).send("ok");
});
app.get("/logout", (req, res) => {
  console.log("Wylogowanie...");
  req.logout();
  res.send("Wylogowano");
});

app.get("/user", (req, res) => {
  res.send(req.session.passport);
});

app.post("/sedziowie", (_req, res) => {
  let judge = _req.body.sedzia;
  let country = _req.body.kraj;

  let newJudge = {
    id: uniqid(),
    sedzia: judge,
    kraj: country
  };

  db.get("sedziowie")
    .push({ id: newJudge.id, sedzia: newJudge.sedzia, kraj: newJudge.kraj })
    .write();

  res.status(201).send("Judge has been created");
});

app.delete("/sedziowie/:id", (_req, res) => {
  let deleteId = _req.params.id;
  db.get("sedziowie")
    .remove({ id: deleteId })
    .write();

  res.status(200).send("Judge has been removed");
});

app.get("/sedziowie", (req, res) => {
  const judges = db.get("sedziowie");
  res.json(judges);
});

app.put("/sedziowie/:id", (req, res) => {
  let updateId = req.params.id;

  db.get("sedziowie")
    .find({ id: updateId })
    .assign({
      sedzia: req.body.sedzia,
      kraj: req.body.kraj
    })
    .write();

  res.status(200).send("Referee has been updated");
});

app.post("/klasy", (_req, res) => {
  let number = _req.body.numer;
  let categoryName = _req.body.kat;
  let commision = _req.body.komisja;

  let newClass = {
    id: uniqid(),
    numer: number,
    kat: categoryName,
    komisja: commision
  };

  db.get("klasy")
    .push({
      id: newClass.id,
      numer: newClass.numer,
      kat: newClass.kat,
      komisja: newClass.komisja
    })
    .write();

  res.status(201).send("Class has been created");
});

app.put("/klasy/:id", (req, res) => {
  let updateId = req.params.id;

  db.get("klasy")
    .find({ id: updateId })
    .assign({
      numer: req.body.numer,
      nazwa: req.body.nazwa,
      komisja: req.body.komisja,
      kat: req.body.kat
    })
    .write();

  res.status(200).send("Class has been updated");
});

app.delete("/klasy/:id", (_req, res) => {
  let deleteId = _req.params.id;
  db.get("klasy")
    .remove({ id: deleteId })
    .write();

  res.status(200).send("Class has been removed");
});

app.get("/klasy", (req, res) => {
  let classes = db.get("klasy");
  res.json(classes);
});


// serwer HTTP dla aplikacji „app”
const server = require("http").createServer(app);

// obsługa Socket.io
const sio = socketIo.listen(server);
// konfiguracja passport-socketio
// połączenie od autoryzowanego użytkownika
const onAuthorizeSuccess = (data, accept) => {
  // data – informacje o połączeniu (od Passport.js)
  // accept – funkcja służąca do akceptowania/odrzucania połączenia
  //          odrzucenie: accept(new Error('powód odrzucenia'));
  console.log("Udane połączenie z socket.io");
  accept();
};
// połączenie od nieutoryzowanego użytkownika lub sytuacja błędna
const onAuthorizeFail = (data, message, error, accept) => {
  // połączenie nieautoryzowane (ale nie błąd)
  console.log("Nieudane połączenie z socket.io");
  accept(new Error("Brak autoryzacji!"));
};
// passport-socketio jako „middleware” dla Socket.io
sio.use(
  passportSocketIo.authorize({
    cookieParser: cookieParser,
    key: sessionKey,
    secret: sessionSecret,
    store: sessionStore,
    success: onAuthorizeSuccess,
    fail: onAuthorizeFail
  })
);

sio.sockets.on("connection", socket => {
  console.log("test");
});

server.listen(3000, () => {
  console.log("Serwer pod adresem http://localhost:3000/");
});
