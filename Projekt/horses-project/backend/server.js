/* eslint-disable no-console */
/*jshint node: true, esversion: 6 */
"use strict";

const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = require("express")();
const uniqid = require("uniqid");
const port = process.env.PORT || 3000;

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

app.listen(port, function() {
  console.log("Serwer nasłuchuje na porcie " + port);
});
