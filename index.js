const { connect } = require('mongodb');

class JMongo{
    constructor(url, dbname){
        this.url = url;
        this.dbname = dbname;
    }
    // Inserts a document
    insertDocument(collection, value){
        const MongoClient = require('mongodb').MongoClient;
        const dbname = this.dbname
        MongoClient.connect(this.url, {useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            dbo.collection(collection).insertOne(value, function(err, res) {
                if (err) throw err;
                console.log("[jmongo:insertDocument] Document inserted");
                db.close();
            });
        });
    }
    // Can be used to change or even create a property
    changeDocument(collection, query, newValues, callback){
        const MongoClient = require('mongodb').MongoClient;
        const dbname = this.dbname
        MongoClient.connect(this.url, {useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            dbo.collection(collection).updateOne(query, { $set: newValues }, function(err, res) {
              if (err) throw err;
              console.log("[jmongo:changeDocument] Document updated");
              db.close();
              callback();
            });
        });
    }
    // Deletes a field from document
    deleteField(collection, query, toDelete){
        const MongoClient = require('mongodb').MongoClient;
        const dbname = this.dbname
        MongoClient.connect(this.url, {useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            dbo.collection(collection).updateOne(query, { $unset: toDelete }, function(err, res) {
              if (err) throw err;
              console.log("[jmongo:deleteField] Document updated");
              db.close();
            });
        });
    }
    // Loads a document with the given query
    load(collection, query, callback){
        const MongoClient = require('mongodb').MongoClient;
        const dbname = this.dbname
        MongoClient.connect(this.url, {useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            dbo.collection(collection).findOne(query, function(err, result) {
              if (err) throw err;
              console.log('[jmongo:load] Document loaded');
              db.close();
              callback(result);
            });
        });
    }
    // Loads the whole collection
    loadAll(collection, callback){
        const MongoClient = require('mongodb').MongoClient;
        const dbname = this.dbname
        MongoClient.connect(this.url, {useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            dbo.collection(collection).find({}).toArray(function(err, result) {
                if (err) throw err;
                db.close();
                callback(result);
            });
        });
    }
    // Deletes a document
    deleteDocument(collection, query){
        const MongoClient = require('mongodb').MongoClient;
        const dbname = this.dbname
        MongoClient.connect(this.url, {useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            dbo.collection(collection).deleteOne(query, function(err, obj) {
                if (err) throw err;
                db.close();
            });
        });
    }
    // Load all documents with only given fields
    loadAllWithFields(collection, fields, callback){
        const MongoClient = require('mongodb').MongoClient;
        const dbname = this.dbname
        MongoClient.connect(this.url, {useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            dbo.collection(collection).find({}, { projection: fields }).toArray(function(err, result) {
                if (err) throw err;
                db.close();
                callback(result);
            });
        });
    }
    // Load all documents with the given query
    loadAllWithQuery(collection, query, callback){
        const MongoClient = require('mongodb').MongoClient;
        const dbname = this.dbname
        MongoClient.connect(this.url, {useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            dbo.collection(collection).find(query).toArray(function(err, result) {
                if (err) throw err;
                db.close();
                callback(result);
            });
        });
    }
}

module.exports = JMongo;
