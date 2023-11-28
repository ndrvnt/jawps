require('dotenv').config();
const https = require('https');
const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');
const fs = require('fs');
const JSONdb = require('simple-json-db');
const db = new JSONdb('./storage.json');
const commonlEmitter = require("./globalEmitter");
const GE = commonlEmitter.commonEmitter;
const apps = express();
apps.use(bodyParser.json());
apps.use(cors())

//Imposto la cartella per i file statici (Server Web base)
apps.use(express.static(path.join(__dirname, "www")))

//creazione del servizio WEBPUSH
webpush.setVapidDetails(process.env.VAPID_SUBJECT, process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);

//endpoint per la sottoscrizione
apps.post('/subscribe', (req, res) => {
  const subscription = req.body;
  if (!db.has(subscription.keys.auth)) {
    db.set(subscription.keys.auth, subscription);
    db.sync();
  }
  res.status(201).json({});
});

//endpoint per eliminare la sottoscrizione
apps.post('/unsubscribe', (req, res) => {
  const subscription = req.body;
  if (db.has(subscription.keys.auth)) {
    db.delete(subscription.keys.auth);
    db.sync();
  }
  res.status(201).json({});
})

//catturo l'evento e invio le notifiche a chi si é registrato
GE.on("INVIANOTIFICA", (dati) => {
  console.log(dati)
  let all = db.JSON();
  Object.keys(all).forEach(user => {
    const payload = JSON.stringify({ title: dati.titolo, body: dati.corpo, icon: "logo.png", url: dati.url });
    webpush.sendNotification(all[user], payload).catch(console.log);
  })
})

//Avvio del telegrambot
const tlg = require("./telegramBot.js");
tlg.START();

// for local test no https
/* try {
   apps.listen(3000, function () {
     console.log("App listening at port %s like a deamon", process.env.PORT);
   });
 } catch (err) {
   console.log(err);
 } */

https
  .createServer({
    key: fs.readFileSync(process.env.key),
    cert: fs.readFileSync(process.env.cert),
  },
    apps,
  )
  .listen(443, () => {
    console.log("App listening at port %s like a deamon", 443);
  });
