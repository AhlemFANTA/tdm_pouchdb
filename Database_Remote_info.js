//Requiring the package
const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
var pouchdbDebug = require('pouchdb-debug');
PouchDB.plugin(pouchdbDebug);
PouchDB.debug.enable('*');

//Creating the database object
const db = new PouchDB('http://root:root@localhost:5984/coronavirus_politologue');
doc = require('./assets/coronavirus.politologue.json');

/*
//Inserting data
db.post(doc, function(err, res){
    if(err) {
        console.log("ERROR PUTTING DATA");
        console.log(err);
    }else{
        console.log('Jeu de données crée');
        console.log(res);
    }
})



//Database information
db.info(function(err, info) {
    if (err) {
        return console.log(err);
    }
    else {
        console.log(info);
    }
});
*/
/*
db.createIndex({
    index: {fields: ['Date']}
});
*/
/*
db.createIndex({
    index: {
        fields: ['Infection', 'Guerisons']
    }
}).then(function (result) {
    // yo, a result
    console.log(result);
}).catch(function (err) {
    // ouch, an error
    console.log(err);
});
*/

db.find({
    selector: {
        Infection: 239607273
    },
    fields: ['_id', 'Infection'],
}).then(function (s){
    console.log(s);
}).catch (function (e){
    console.log(e);
});

/*
db.find({
    selector: {name: 'Mario'},
    fields: ['_id', 'name'],
    sort: ['name']
}).then(function (result) {
    // yo, a result
}).catch(function (err) {
    // ouch, an error
});

 */
