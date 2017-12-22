const fs = require('fs');
var path = require('path');
const _ = require('lodash')

const changeWord = require('./variables.json');

const templates = '/templates/';
const fileMessage = '/message.html';
const fileSubject = '/subject.html';


const readFile = (fileName, type) => {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, type, (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
};

function replaceAll(str, from, to) {
  return _.replace(str, new RegExp(from,"g"), to)
}

const Templater = (type = 'accountCreate', replace = { email: 'teste', link: 'teste ' }) => {
  return new Promise(function (resolve, reject) {
    let templatesPath =  path.join(__dirname, templates, type);

    let messageLocation = templatesPath + fileMessage;
    let subjectLocation = templatesPath + fileSubject;

    readFile(messageLocation, 'utf8').then((message) => {
      readFile(subjectLocation, 'utf8').then((subject) => {

        change = changeWord[type];

        messageReplaced = message;
        subjectReplaced = subject;

        Object.keys(replace).map(function (key) {
          messageReplaced = replaceAll(messageReplaced, change[key], replace[key]);
          subjectReplaced = replaceAll(subjectReplaced, change[key], replace[key]);
        });

        var mail = {
          message: messageReplaced,
          subject: subjectReplaced
        }

        resolve(mail);

      }).catch((error) => {
        console.error('Error: ', error);
        reject(error);
      });
    }).catch((error) => {
      console.error('Error: ', error);
      reject(error);
    });

  });

};


module.exports = { Templater };