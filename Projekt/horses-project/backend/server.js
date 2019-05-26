/* eslint-disable no-console */
/*jshint node: true, esversion: 6 */
"use strict";

const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = require("express")();
const port = process.env.PORT || 3000;

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({ sedziowie: [] }).write();
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(cors({ credentials: true, origin: "http://localhost:8080" }));
app.use(express.static("public"));

app.post("/sedziowie", (_req, res) => {
  let count = 0;
  let judge = _req.body.sedzia;
  let country = _req.body.kraj;

  let judges = db.get("sedziowie");
  let judgesLength = Array.from(judges).length;

  if (judgesLength === 0) {
    count = 1;
  } else {
    count = judgesLength + 1;
  }

  let newJudge = {
    id: count,
    sedzia: judge,
    kraj: country
  };

  db.get("sedziowie")
    .push({ id: newJudge.id, sedzia: newJudge.sedzia, kraj: newJudge.kraj })
    .write();

  res.status(201).send("Judge has been created");
});

app.delete("/sedziowie/:id", (_req, res) => {
  let deleteId = parseInt(_req.params.id);
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
  let updateId = parseInt(req.params.id);
  db.get("sedziowie")
    .find({ id: updateId })
    .assign({
      name: req.body.sedzia,
      country: req.body.kraj
    })
    .write();

  res.status(200).send("Referee has been updated");
});

app.listen(port, function() {
  console.log("Serwer nasłuchuje na porcie " + port);
});
