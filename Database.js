//Requiring the package
const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));

const data = './assets/coronavirus_data_6388.json';

//Creating local database object
const db_local = new PouchDB('coronavirus_data');

//Creating remote database object
const db_Remote = new PouchDB('http://root:root@localhost:5984/coronavirus_data');

//Replicating a local database to Remote
PouchDB.replicate(db_local, db_Remote);
console.log("Database replicated successfully");

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

    //find querry
    return db.find({
        selector: {'Pays': {$eq: 'Tunisie'}},
        fields: ['_id', 'Pays']
    });

}).then(function (res) {
    console.log("RES: ", res);

}).then(function (res) {
    console.log('REMOVING DB');
    db.destroy();
}).catch(function (err) {
    console.log("ERROR", err);
})

