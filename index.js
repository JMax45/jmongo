const { connect } = require('mongodb');

class JMongo{
    constructor(url, dbname){
        this.url = url;
        this.dbname = dbname;
    }

    /**
     * Upload a document or an array of documents
     * @param collection Name of the collection to upload to
     * @param document The document to upload, can be an object or an array of objects
     */
    async insertDocument(collection, document){
        return new Promise((resolve, reject) => {
            const MongoClient = require('mongodb').MongoClient;
            const dbname = this.dbname
            MongoClient.connect(this.url, {useUnifiedTopology: true}, function(err, db) {
                if (err) reject(err);
                var dbo = db.db(dbname);
                if(Array.isArray(document)){
                    dbo.collection(collection).insertMany(document, function(err, res) {
                        if (err) reject(err);
                        db.close();
                        resolve();
                    })
                }
                else{
                    dbo.collection(collection).insertOne(document, function(err, res) {
                        if (err) reject(err);
                        db.close();
                        resolve()
                    });
                }
            });
        })
    }
    async changeDocumentProperty(collection, query, newValues){
        return new Promise((resolve, reject) => {
            const MongoClient = require('mongodb').MongoClient;
            const dbname = this.dbname
            MongoClient.connect(this.url, {useUnifiedTopology: true}, function(err, db) {
                if (err) reject(err);
                var dbo = db.db(dbname);
                dbo.collection(collection).updateOne(query, { $set: newValues }, function(err, res) {
                    if (err) reject(err);
                    db.close();
                    resolve();
                });
            });
        })
    }
    async deleteDocumentProperty(collection, query, toDelete){
        return new Promise((resolve, reject) => {
            const MongoClient = require('mongodb').MongoClient;
            const dbname = this.dbname
            MongoClient.connect(this.url, {useUnifiedTopology: true}, function(err, db) {
                if (err) reject(err);
                var dbo = db.db(dbname);
                dbo.collection(collection).updateOne(query, { $unset: toDelete }, function(err, res) {
                    if (err) reject(err);
                    db.close();
                    resolve();
                });
            });
        })
    }
    async load(collection, query){
        return new Promise((resolve, reject) => {
            const MongoClient = require('mongodb').MongoClient;
            const dbname = this.dbname
            MongoClient.connect(this.url, {useUnifiedTopology: true}, function(err, db) {
                if (err) reject(err);
                var dbo = db.db(dbname);
                dbo.collection(collection).findOne(query, function(err, result) {
                    if (err) reject(err);
                    db.close();
                    resolve(result);
                });
            });
        })
    }
    async loadAll(collection, query, projection){
        return new Promise((resolve, reject) => {
            const MongoClient = require('mongodb').MongoClient;
            const dbname = this.dbname
            MongoClient.connect(this.url, {useUnifiedTopology: true}, function(err, db) {
                if (err) reject(err);
                var dbo = db.db(dbname);
                dbo.collection(collection).find(query, { projection: projection }).toArray(function(err, result) {
                    if (err) reject(err);
                    db.close();
                    resolve(result);
                });
            });
        })
    }
    async deleteDocument(collection, query){
        return new Promise((resolve, reject) => {
            const MongoClient = require('mongodb').MongoClient;
            const dbname = this.dbname
            MongoClient.connect(this.url, {useUnifiedTopology: true}, function(err, db) {
                if (err) reject(err);
                var dbo = db.db(dbname);
                dbo.collection(collection).deleteOne(query, function(err, obj) {
                    if (err) reject(err);
                    db.close();
                    resolve();
                });
            });
        })
    }
}

module.exports = JMongo;
