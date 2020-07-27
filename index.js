const { connect } = require('mongodb');

class JMongo{
    constructor(url, dbname){
        this.url = url;
        this.dbname = dbname;
    }
    // Can be used to change or even create a property
    changeDocument(collection, query, newValues){
        const MongoClient = require('mongodb').MongoClient;
        const dbname = this.dbname
        MongoClient.connect(this.url, {useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            dbo.collection(collection).updateOne(query, { $set: newValues }, function(err, res) {
              if (err) throw err;
              console.log("[jmongo:changeDocument] Document updated");
              db.close();
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
}

module.exports = JMongo;