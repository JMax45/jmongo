# JMongo

## Description
This is a small module which facilitates the use of the MongoDB driver.

It contains functions that perform specific purposes, for example ```insertDocument()``` inserts a document in the specified collection.
You can find all the functions and their descriptions here below.

## Installation
Using npm: 
```bash
npm i jmongo
```

## Usage:
```
const JMongo = require('jmongo');
const jmongo = new JMongo(databaseUrl, dbname);
```
```databaseUrl``` = The url of your database

```dbname``` = The name of the database to use

## Functions:
All the functions are async and return a promise

```async insertDocument(collection, value) : Promise```

Inserts a document in the collection
```javascript
jmongo.insertDocument('users', yourObject);
```

```async changeDocumentProperty(collection, query, newValues) : Promise```

Changes a document property or creates one
```javascript
jmongo.changeDocumentProperty('users', { id: 1 }, { name: 'John' });
```

```async deleteDocumentProperty(collection, query, toDelete) : Promise```

Deletes a document property
```javascript
jmongo.deleteDocumentProperty('users', { id: 1 }, { name: '' });
```

```async load(collection, query) : Promise```

Loads the document with the given query and returns it in the promise
```javascript
jmongo.load('users', { id: 1 }).then((user) => { console.log(user) }
```

```async loadAll(collection, query, projection) : Promise```

Loads all the documents with the given projection, query and returns them in the promise.
```javascript
jmongo.loadAll('users',{ company: 'Google' }, { name: '', job: '' })
    .then((users) => { console.log(users) }
/* 
This will return all the documents with the property: { company: 'Google' }
but it will only return the name and job properties
example:
[
    {
        _id: '5f597fc1b1a6f651c04dd46d',
        name: 'John Doe',
        job: 'Software engineer'
    },
    {
        _id: '5f5980c29348525283ade6c1',
        name: 'Angela Doe',
        job: 'Sales'
    }
]
*/
```

If you want to load all the documents in the collection just pass an empty object or null
```javascript
jmongo.loadAll('users', { }, { })
    .then((users) => { console.log(users) }
```
The same goes for the projection, if you want to load all the properties then pass an empty object or null (or just leave it blank)
```javascript
jmongo.loadAll('users', { company: 'Google' }, { })
    .then((users) => { console.log(users) }
```

```async deleteDocument(collection, query) : Promise```

Deletes the document with the given query
```javascript
jmongo.deleteDocument('users', { id: 1 });
```