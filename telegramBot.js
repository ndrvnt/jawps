require('dotenv').config();
const TelegramBot = require("node-telegram-bot-api");
const commonlEmitter = require("./globalEmitter");
const GE = commonlEmitter.commonEmitter;
const TELEGRAM_TOCKEN = process.env.TELEGRAMKEY;
const UTENTI = [""];
let avviato = 0;

exports.START = async () => {
  let TITOLO = "";
  let CORPO = "";
  let URL = "";

  if (avviato > 0) {
    return;
  }
  avviato++;
  const bot = new TelegramBot(TELEGRAM_TOCKEN, { polling: true });

  bot.onText(/\/ping/, (msg) => {
    if (UTENTI.indexOf(msg.from.username) == -1) {
      bot.sendMessage(msg.chat.id, "Non sei autorizzato ad usare questo bot");
    } else {
      const chatId = msg.chat.id;
      bot.sendMessage(chatId, "PONG!");
    }
  });

  bot.onText(/\/list/, (msg) => {
    const chatId = msg.chat.id;
    if (UTENTI.indexOf(msg.from.username) == -1) {
      bot.sendMessage(msg.chat.id, "Non sei autorizzato ad usare questo bot");
    } else {
      const chatId = msg.chat.id;
      bot.sendMessage(chatId, "COMANDI:");
      bot.sendMessage(chatId, "/list => lista dei comanti 😂");
      bot.sendMessage(chatId, "/ping => controllare che il servizio é sempre attivo");
      bot.sendMessage(chatId, "/reset => resetta la notifica");
      bot.sendMessage(chatId, "/titolo testo => imposta il titolo della prossima notifica");
      bot.sendMessage(chatId, "/corpo testo => imposta il corpo della prossima notifica");
      bot.sendMessage(chatId, "/url testo => imposta l'url della prossima notifica");
      bot.sendMessage(chatId, "/controllo => Mostra titolo e corpo dell anotifica");
      bot.sendMessage(chatId, "/invia => Invia la notifica preparata");
      // bot.sendMessage(chatId, "/test => Invia la notifica pre confezionata");
    }
  });

  bot.onText(/\/titolo/, (msg) => {
    const chatId = msg.chat.id;
    console.log(`CHAT_ID:${chatId}`)
    if (UTENTI.indexOf(msg.from.username) == -1) {
      bot.sendMessage(msg.chat.id, "Non sei autorizzato ad usare questo bot");
    } else {
      TITOLO = msg.text.replace("/titolo", "").trim();
      console.log(TITOLO)
      bot.sendMessage(chatId, "Titolo aggiornato");
    }
  });

  bot.onText(/\/corpo/, (msg) => {
    const chatId = msg.chat.id;
    if (UTENTI.indexOf(msg.from.username) == -1) {
      bot.sendMessage(msg.chat.id, "Non sei autorizzato ad usare questo bot");
    } else {
      CORPO = msg.text.replace("/corpo", "").trim();
      bot.sendMessage(chatId, "Corpo aggiornato");
    }
  });

  bot.onText(/\/url/, (msg) => {
    const chatId = msg.chat.id;
    console.log(`CHAT_ID:${chatId}`)
    if (UTENTI.indexOf(msg.from.username) == -1) {
      bot.sendMessage(msg.chat.id, "Non sei autorizzato ad usare questo bot");
    } else {
      URL = msg.text.replace("/corpo", "").trim();
      console.log(URL)
      bot.sendMessage(chatId, "Url aggiornato");
    }
  });

  bot.onText(/\/controllo/, (msg) => {
    const chatId = msg.chat.id;
    console.log(`CHAT_ID:${chatId}`)
    if (UTENTI.indexOf(msg.from.username) == -1) {
      bot.sendMessage(msg.chat.id, "Non sei autorizzato ad usare questo bot");
    } else {
      bot.sendMessage(chatId, `TITOLO:\n${TITOLO}\nCORPO:\n${CORPO}\nURL:\n${URL}`);
    }
  });

  bot.onText(/\/reset/, (msg) => {
    const chatId = msg.chat.id;
    if (UTENTI.indexOf(msg.from.username) == -1) {
      bot.sendMessage(msg.chat.id, "Non sei autorizzato ad usare questo bot");
    } else {
      TITOLO = '';
      CORPO = '';
      bot.sendMessage(chatId, `Notifica resettata`);
    }
  });

  bot.onText(/\/invia/, (msg) => {
    const chatId = msg.chat.id;
    if (UTENTI.indexOf(msg.from.username) == -1) {
      bot.sendMessage(msg.chat.id, "Non sei autorizzato ad usare questo bot");
    } else {
      if (TITOLO == '' || CORPO == '' || URL == '') {
        bot.sendMessage(chatId, `Controlla TITOLO E CORPO`);
      } else {
        GE.emit("INVIANOTIFICA", { titolo: TITOLO, corpo: CORPO, url: URL })
        bot.sendMessage(chatId, `Notifica inviata`);
      }
    }
  });

  // bot.onText(/\/test/, (msg) => {
  //   const chatId = msg.chat.id;
  //   console.log(`CHAT_ID:${chatId}`)
  //   if (UTENTI.indexOf(msg.from.username) == -1) {
  //     bot.sendMessage(msg.chat.id, "Non sei autorizzato ad usare questo bot");
  //   } else {
  //     GE.emit("INVIANOTIFICA", { titolo: "TITOLO", corpo: "CORPO", url: "https://baudaffi.com" })
  //     bot.sendMessage(chatId, `Notifica di test inviata`);
  //   }
  // });
};


