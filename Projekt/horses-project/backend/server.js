/* eslint-disable no-console */
/*jshint node: true, esversion: 6 */
"use strict";

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = require("express")();
const uniqid = require("uniqid");
const fs = require("fs");
const ip = require("ip");

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

db.defaults({
  sedziowie: [],
  klasy: [],
  konie: []
}).write();

app.use(
  bodyParser.json({
    limit: "50mb"
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true
  })
);

app.use(
  cors({
    credentials: true,
    origin: function(origin, callback) {
      return callback(null, true);
    }
  })
);
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
    .push({
      id: newJudge.id,
      sedzia: newJudge.sedzia,
      kraj: newJudge.kraj
    })
    .write();

  res.status(201).send("Judge has been created");
});

app.delete("/sedziowie/:id", (_req, res) => {
  let deleteId = _req.params.id;
  db.get("sedziowie")
    .remove({
      id: deleteId
    })
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
    .find({
      id: updateId
    })
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
    .find({
      id: updateId
    })
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
    .remove({
      id: deleteId
    })
    .write();

  res.status(200).send("Class has been removed");
});

app.get("/klasy", (req, res) => {
  let classes = db.get("klasy");
  res.json(classes);
});

app.get("/konie", (req, res) => {
  const horses = db.get("konie");
  res.json(horses);
});

app.post("/konie", (_req, res) => {
  let number = _req.body.numer;
  let className = _req.body.klasa;
  let name = _req.body.nazwa;
  let country = _req.body.kraj;
  let year = _req.body.rocznik;
  let masc = _req.body.masc;
  let gender = _req.body.plec;
  let breeder = _req.body.hodowca;
  let owner = _req.body.wlasciciel;
  let lineage = _req.body.rodowod;
  let results = _req.body.wynik;

  db.get("konie")
    .push({
      id: uniqid(),
      numer: number,
      klasa: className,
      nazwa: name,
      kraj: country,
      rocznik: year,
      masc: masc,
      plec: gender,
      hodowca: breeder,
      wlasciciel: owner,
      rodowod: lineage,
      wynik: results
    })
    .write();

  res.status(201).send("Horse has been created");
});

app.put("/konie/:id", (req, res) => {
  let updateId = req.params.id;

  db.get("konie")
    .find({
      id: updateId
    })
    .assign({
      numer: req.body.numer,
      klasa: req.body.klasa,
      nazwa: req.body.nazwa,
      kraj: req.body.kraj,
      rocznik: req.body.rocznik,
      masc: req.body.masc,
      plec: req.body.plec,
      hodowca: req.body.hodowca,
      wlasciciel: req.body.wlasciciel,
      rodowod: req.body.rodowod,
      wynik: req.body.wynik
    })
    .write();

  sio.sockets.emit("updateScores");
  sio.sockets.emit("updateRank");
  res.status(200).send("Horse has been updated");
});

app.delete("/konie/:id", (_req, res) => {
  let deleteId = _req.params.id;
  db.get("konie")
    .remove({
      id: deleteId
    })
    .write();

  res.status(200).send("Hrse has been removed");
});

app.post("/import", (_req, res) => {
  let database = _req.body;
  fs.writeFile("./db.json", JSON.stringify(database), "utf8", function(err) {
    if (err) {
      return console.log("nie pykło");
    }
    db.read();
    console.log("The file was saved!");
  });

  res.status(200).send("Import completed succesfully.");
});

app.post("/newEvent", (_req, res) => {
  console.log("weszło");
  fs.unlinkSync("./db.json", err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("success");
    db.defaults({
      sedziowie: [],
      klasy: [],
      konie: []
    }).write();
    db.read();
  });
  db.read();
  res.status(200).send("New event created succesfully.");
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
  accept();
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

server.listen(3000, ip.address(), () => {
  console.log("Serwer pod adresem " + ip.address() + ":3000/");
});
