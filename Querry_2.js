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

db.bulkDocs(doc).then(function (res) {
    console.log('Jeu de données crée');
    //  console.log(res);
    return db.createIndex({index: {fields: ['Pays']}});
}).then(function (res) {
    console.log('INDEX CREE PAR PAYS');
    return db.createIndex({index: {fields: ['Date']}});
}).then(function (res) {
    console.log('INDEX CREE PAR DATE');

    // 2- Quel est le taux de décès maximal sur toute la période ?
    var mapQ2 = function (doc) {
        emit("ALL", doc.TauxDeces);
    };
    var reduceQ2 = function (keys, values, rereduce) {
        return Math.max(...values);
    }
    debut = Date.now();
    return db.query({map: mapQ2, reduce: reduceQ2}, {reduce: true, group: true, group_level: 1});

}).then(function (res) {
    var duree = Date.now() - debut;
    console.log("Taux Max Décès :", res.rows[0].value);
    console.log("Duree en millisecondes: ", duree );
}).then(function (res) {
    db.destroy();
}).catch(function (err) {
    console.log("ERROR", err);
})

