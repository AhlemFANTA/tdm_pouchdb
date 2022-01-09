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


    // 4- Quel est le taux d’infection le plus élevé en Argentine ?
    debut = Date.now();
    return db.find({
        selector: {Pays: "Argentine"},
        fields: ['TauxInfection']
    }).then(function (res){
        return Math.max(...res.docs.map(doc => doc.TauxInfection));
    });


}).then(function (res) {
    var duree = Date.now() - debut;
    console.log("Le taux d’infection le plus élevé en Argentine est : ",
        JSON.stringify(res, null, 2));
    console.log("Duree en millisecondes: ", duree);
}).then(function (res) {
    db.destroy();
}).catch(function (err) {
    console.log("ERROR", err);
})

