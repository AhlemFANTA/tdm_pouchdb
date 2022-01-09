//Requiring the package
const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));

const dataSize = process.argv.length === 3? process.argv[2] : 10;
const data = './assets/coronavirus_data_'+dataSize+'.json';
console.log("*** DATA SET:", data);

//Creating local database object
const db_local = new PouchDB('coronavirus_data');

//Inserting data
const db = db_local;
doc = require(data);

db.on('error', function (err) {
    console.log("FAILURE", err)
});

var debut;
db.bulkDocs(doc).then(function (res) {
    console.log('Jeu de données crée');
    //  console.log(res);
    return db.createIndex({index: {fields: ['Pays']}});
}).then(function (res) {
    console.log('INDEX CREE PAR PAYS');
    return db.createIndex({index: {fields: ['Date']}});
}).then(function (res) {
    console.log('INDEX CREE PAR DATE');

    // Requêtes Analyste de données
    // 5- Quel jour a eu lieu le pic d’infection par pays ?
    var map = function(doc) {
        emit(doc.Pays, {Date: doc.Date, Infection: doc.Infection})
    }

    var reduce = function(keys, values, rereduce) {
        return values.reduce(function (a, b) {return a.Infection > b.Infection? a : b; });
    }

    debut = Date.now();
    return db.query({map: map, reduce: reduce}, {reduce: true, group: true, group_level: 1});

}).then(function (res) {
    var duree = Date.now() - debut;

    var out = res.rows.map(function(item) {
        return {Pays: item.key, Date: item.value.Date, Pic: item.value.Infection};
    });

    console.log("Le jour a eu lieu le pic d’infection par pays : ", JSON.stringify(out, null, 2));
    console.log("Duree en millisecondes: ", duree);
}).then(function (res) {
    db.destroy();
}).catch(function (err) {
    console.log("ERROR", err);
})

