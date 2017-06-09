"use strict";
const apn = require("apn");

var options = {
    cert: "app_server/keys/cert.pem",
    key: "app_server/keys/key.pem",
    production: false,
};

var apnProvider = new apn.Provider(options);

let deviceToken = "0a6fc813ca35b758c730fe1efe9e172c0a4ce63b93630c906290f97d2a9da8c3";
var note = new apn.Notification();

note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
note.badge = 1;
note.sound = "default";
note.alert = "\uD83D\uDCE7 \u2709 You have a new message";

apnProvider.send(note, deviceToken).then(function (result) {
    console.log(result);
});
