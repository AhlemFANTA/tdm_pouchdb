# What is PouchDB
<p>
PouchDB is an open source in-browser database API written in JavaScript.   

It is modelled after Couch DB – a NoSQL database. Using this API, we can build applications that work offline and online. 

It internally uses WebSQL and IndexedDB to store data.
</p>

#How Does it Work?
<p>
In PouchDB, when the application is offline, the data is stored locally using WebSQL and IndexedDB in the browser.   

When the application is back online, it is synchronized with CouchDB and compatible servers.  

Using PouchDB, you can communicate with both local and remote databases seamlessly without noticing any difference.  
</p>

#How to get on with this application?
1. Installing Pouch Using Node.js
```
npm install --save PouchDB
```
2. Downloading CouchDB  

   [https://couchdb.apache.org](https://couchdb.apache.org/)  
3. After installation, open built-in web interface of CouchDB by visiting the following link:  
   [http://127.0.0.1:5984/](http://127.0.0.1:5984/)  

#About this project
This project contains the following :
- a folder "assets" witch contains a dataset of different sizes (10, 100, 1000, 6388, 10000 docs)
- 6 querries written in Javascript to explore dataset using Map Reduce and find() functionnalities.

#How to run it?
run the following command :
```
node + name of js file + size of dataset
ex : node querry_1.js 1000
```
