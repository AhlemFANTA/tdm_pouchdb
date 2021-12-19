//Requiring the package
const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));

const data = './assets/coronavirus_data_10.json';

//Creating local database object
const db_local = new PouchDB('coronavirus_data');

//Inserting data
const db = db_local;
doc = require(data);

var debut;

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


    //Requêtes standards
    //1- Quel est le nombre total de décès par pays ?
    var map = function (doc) {
        emit(doc.Pays, doc.Deces);
    };
    var reduce = function (keys, values, rereduce) {
        return sum(values);
    };
    debut = Date.now();
    return db.query({map: map, reduce: reduce}, {reduce: true, group: true, group_level: 1},
        function (err, response) {
            console.log(JSON.stringify(response.rows));
        });

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

