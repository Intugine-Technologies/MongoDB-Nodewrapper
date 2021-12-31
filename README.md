# @intugine-technologies/mongodb
  
A mongo envelope specifically designed in house for Intugine Technologies.
  
## Installation
  
First install Node.js and Mongodb. Then:
  
```
npm i --S @intugine-technologies/mongodb
```
  
## Importing
  
```
// Using Node.js `require()`
const mongo = require("@intugine-technologies/mongodb");
  
  
```
  
## Overview
  
### Connecting to MongoDB
  
First, we need to define a connection.
  
```
const mongo = require("@intugine-technologies/mongodb");
  
mongo("MongoDB Connection URI here", "DB_Name here", {useNewUrlParser: true});
```
  
**Note-** If the Given DB doesn't exist in the provided URI then a new DB gets created automatically when the first document entry is made in a collection.
  
Once connected the mongo function returns a promise. So, any further operations can be done use **.then()** function.
  
### Create a new collection
  
```
const mongo = require("@intugine-technologies/mongodb");
let db;
  
mongo("MongoDB Connection URI here", "DB_Name here", {useNewUrlParser: true})
.then(res => {
db = res;
  
/**
*@params {Object/[Objects]} data - document data to be stored in collection, here pass a single object for creating a single object or pass an array of objects having a document's data in every object.
*/
  
db.create("collection_name", data);
})
.then(res => {
db.close();
db = null;
});
```
  
### Read from Database
  
```
const mongo = require("@intugine-technologies/mongodb");
let db;
  
  
mongo("MongoDB Connection URI here", "DB_Name here", {useNewUrlParser: true})
.then(res => {
db = res;
  
/**
* All the options follow standard MongoDB syntax
* @params {Object} query - Standard MongoDB query.
* @params {Number} limit - If any certain number of documents are needed.
* @params {Number} offset - To skip some number of documents from beginning.
* @params {Object} projection - standard MongoDB projections.
* @params {Object} sort - Any sorting options will go in here.
*/
  
  
db.read("collection_name", [query], [limit], [offset], [projection], [sort]);
})
.then(res => {
db.close();
db = null;
});
```
  
**Note-** By default sort option is set to `{_id:-1}`
  
### Update any Document
  
```
const mongo = require("@intugine-technologies/mongodb");
let db;
  
  
mongo("MongoDB Connection URI here", "DB_Name here", {useNewUrlParser: true})
.then(res => {
db = res;
  
/**
* All the options follow standard MongoDB syntax
* @params {Object} query - Standard MongoDB query.
* @params {Object} change - standard change query goes in here. by default $set is there.
* @params {Object} options - Any other options such as upsert etc goes in here in standard format.
*/
  
db.update("collection_name", [query], [change], [options]);
})
.then(res => {
db.close();
db = null;
});
```
  
### Delete a Document
  
```
const mongo = require("@intugine-technologies/mongodb");
let db;
  
mongo("MongoDB Connection URI here", "DB_Name here", {useNewUrlParser: true})
.then(res => {
db = res;
  
/**
* All the options follow standard MongoDB syntax
* @params {Object} query - Standard MongoDB query.
*/
  
db.delete("collection_name", query);
})
.then(res => {
db.close();
db = null;
});
```
  
### Aggregate a Document
  
```
const mongo = require("@intugine-technologies/mongodb");
let db;
  
mongo("MongoDB Connection URI here", "DB_Name here", {useNewUrlParser: true})
.then(res => {
db = res;
  
/**
* All the options follow standard MongoDB syntax
* @params {Array/[Objects]} pipeline - Standard MongoDB query.
* @params {Object} options -Any other options for DiskUse.
*/
  
db.aggregate("collection_name",[pipeline], [options])
  
.then(res => {
db.close();
db = null;
##Sample
db.aggregate("collection_name",[{$match: {name: 'x'}, {$group: {_id: "}], {allowDiskUse: true})
  
.then(res => {
db.close();
db = null;  
});
```
  
### Instance a Document
  
```
const mongo = require("@intugine-technologies/mongodb");
let db;
  
mongo("MongoDB Connection URI here", "DB_Name here", {useNewUrlParser: true})
.then(res => {
db = res;
  
/**
* All the options follow standard MongoDB syntax
* @params {Object} options -Any other options for DiskUse.
* @params {String} dbname - Name of the database you want to use
* @params {String} dburl  - url of the database you want to use
*/
db.dbInstance("dbname")
  
.then(res => {
return db.dbInstance.collection();
db.close();
db.close();
db = null;  
});
```
```
```
  
  
  
### Count Number of Documents
  
```
const mongo = require("@intugine-technologies/mongodb");
let db;
  
mongo("MongoDB Connection URI here", "DB_Name here", {useNewUrlParser: true})
.then(res => {
db = res;
  
/**
* All the options follow standard MongoDB syntax
* @params {Object} query - Standard MongoDB query.
*/
  
db.count("collection_name", query);
})
.then(res => {
db.close();
db = null;
});
```