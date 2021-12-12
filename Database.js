//Requiring the package
const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));

//Creating the database object
const db_local = new PouchDB('coronavirus_data');
// const db_Remote = new PouchDB('http://root:root@localhost:5984/coronavirus_data');
doc = require('./assets/coronavirus_data.json');

//Inserting data
const db = db_local;


db.bulkDocs(doc).then(function (res) {
    console.log('Jeu de données crée');
  //  console.log(res);
    return db.createIndex({index: {fields: ['Pays']}});
}).then(function (res) {
    console.log('INDEX CREE PAR PAYS');
    return db.createIndex({index: {fields: ['Date']}});
}).then(function (res) {
    console.log('INDEX CREE PAR DATE');

    return db.find({
        selector: {'Pays': {$eq: 'Tunisie'}},
        fields: ['_id', 'Pays']
    });
}).then(function (res) {
    console.log('FIND: RES');
    console.log(res);
    //console.log(s);
}).then(function (res) {
    console.log('REMOVING DB');
    db.destroy();
}).catch(function (err) {
    console.log("ERROR", err);
})

/*

db.bulkDocs(doc, function (err, res) {
    if (err) {
        console.log("ERROR PUTTING DATA");
        console.log(err);
    } else {
        console.log('Jeu de données crée');
        console.log(res);

        db.createIndex({
            index: {fields: ['Pays']}
        }).then(function (index) {
            // yo, a result
            console.log('INDEX CREE');
            console.log(index);
            db.find({
                selector: {'Pays': 'Andorre'},
                //selector: {},
                fields: ['_id', 'Pays']
            }).then(function (s) {
                console.log('FIND: RES');
                console.log(s);
                //console.log(s);

                db.destroy();
            }).catch(function (e) {
                console.log(e);
            });
        }).catch(function (err) {
            // ouch, an error
            console.log(err);
        });
    }
})
*/

//Database information

