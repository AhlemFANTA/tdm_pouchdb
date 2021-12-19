//Requiring the package
const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));

const data = './assets/coronavirus_data_10.json';

//Creating local database object
const db_local = new PouchDB('coronavirus_data');

//Inserting data
const db = db_local;
doc = require(data);

db.on('error', function (err) {
    console.log("FAILURE", err)
});

db.bulkDocs(doc).then(function (res) {
    console.log('Jeu de données crée');
    //  console.log(res);
    return db.createIndex({index: {fields: ['Pays']}});
}).then(function (res) {
    console.log('INDEX CREE PAR PAYS');
    return db.createIndex({index: {fields: ['Date']}});
}).then(function (res) {
    console.log('INDEX CREE PAR DATE');


    // 4- Quel est le taux d’infection le plus élevé  en Suisse ?


}).then(function (res) {
    console.log("RES: ", res);
    var duree = Date.now() - debut;
    console.log("Duree en millisecondes: ", duree +"s");
}).then(function (res) {
    console.log('REMOVING DB');
    db.destroy();
}).catch(function (err) {
    console.log("ERROR", err);
})

