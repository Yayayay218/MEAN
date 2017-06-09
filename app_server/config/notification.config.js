"use strict";
const apn = require("apn");
const schedule = require('node-schedule');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Notifications = mongoose.model('Notifications');

var options = {
    cert: "app_server/keys/cert.pem",
    key: "app_server/keys/key.pem",
    production: false,
};

var apnProvider = new apn.Provider(options);

let deviceToken = "0a6fc813ca35b758c730fe1efe9e172c0a4ce63b93630c906290f97d2a9da8c3";
var note = new apn.Notification();

//  Notification Content
note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
note.badge = 1;
note.sound = "default";

var rule = new schedule.RecurrenceRule();

note.body = 'Link ';
note.title = 'Message ';
rule.hour = 0;
rule.minute = 25;
//  Config Pushing Time Daily
// Notifications.find(function (err, notification) {
//     if (err)
//         console.log(err);
//     else {
//         for(var i=0; i<notification.length; i++) {
//             note.body = 'Link ' + notification[i].link;
//             note.title = 'Message ' + notification[i].message;
//             rule.hour = notification[i].hour;
//             rule.minute = notification[i].minute;
//             schedule.scheduleJob(rule, function () {
//                 apnProvider.send(note, deviceToken).then(function (result) {
//                     console.log(result);
//                 });
//             });
//         }
//     }
// });

// schedule.scheduleJob(rule, function () {
//     apnProvider.send(note, deviceToken).then(function (result) {
//         console.log(result);
//     });
// });








