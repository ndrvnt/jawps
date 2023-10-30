# J.A.W.P.S.

## Uno dei tanti push server

Questo piccolo progetto é un server push con un minimal webserver.
Le notifiche vengono generate e inviate tramite bot telegram.

## Setup

Scaricate il codice e installate i moduli di NodeJs richiesti dal pacchetto.

```
npm install
```

## Configurazione SERVER PUSH

Genera VAPID dal sito [https://vapidkeys.com/](https://vapidkeys.com/)

I valori generati vanno inseriti nel file **.env**

```
VAPID_PUBLIC_KEY=""
VAPID_PRIVATE_KEY=""
VAPID_SUBJECT=""
```

e la **PUBLIC_KEY** va inserita pure nel file www/client.js alla riga 1

## SELF SIGNED CERTIFICATE

Per generare i certificati SSL ci sono due strade.

- Per test in locale [https://www.baeldung.com/openssl-self-signed-cert](https://www.baeldung.com/openssl-self-signed-cert)
- Per la produzione [https://letsencrypt.org/it/](https://letsencrypt.org/it/)

Andate a valorizzare il percorso dei certificati generati nel file **.env**

## BOT TELEGRAM

Per creare un bot telegram basta contattare BotFather [https://telegram.me/BotFather](https://telegram.me/BotFather).

Alla fine della procedura salvatevi la Telegram key del bot e andate a salvarla nel file **.env**

Nel file _telegramBot.js_ alla riga 6 andate a inserire gli username telegram di chi ha il diritto di comandare il bot.

esempio:

```js
const UTENTI = ['Username1', 'Username2', 'Username3', 'Username4'];
```

## UTENTI

Il file **storage.json** conterrá tutti gli utenti che sottoscriveranno il servizio di notifica.
Attenzione a non cancellarlo o modificarlo a mano.
