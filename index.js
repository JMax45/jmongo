const { ObjectId } = require('mongodb');

class JMongo{
    constructor(url, dbname){
        this.url = url;
        this.dbname = dbname;
    }

    /**
     * Create a new ObjectID instance
     * @param {string} str Can be a 24 byte hex string. 12 byte binary string or a Number
     */
    objectID(str){
        return new ObjectId(str);
    }

    /**
     * Upload a document or an array of documents
     * @param {string} collection Collection name
     * @param {Object} document The document to upload, can be an object or an array of objects
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

    /**
     * Change a document property or create one
     * @param {string} collection Collection name
     * @param {Object} query Query
     * @param {Object} newValues New properties of the document
     */
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
    
    /**
     * Deletes a document property
     * @param {string} collection Collection name
     * @param {Object} query Query
     * @param {Object} toDelete The property to delete, e.g { name: '' } will delete the name property
     */
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

    /**
     * Loads the first found document with the given query and returns it in the promise
     * @param {string} collection Collection name
     * @param {Object} query Query
     */
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

    /**
     * Loads all the documents with the given projection, query and returns them in the promise.
     * @param {string} collection Collection name
     * @param {Object} query The query, pass empty object if you need to include all the documents in the collection
     * @param {Object} projection Properties to include, pass empty object if you need to include all the properties
     */
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

    /**
     * Deletes the first found document with the given query
     * @param {string} collection Collection name
     * @param {Object} query Query
     */
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
