# JMongo

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
Functions:

```changeDocument(collection, query, newValues);```

Sets an attribute to the given value
```javascript
jmongo.changeDocument('users', { id: '1' }, { name: 'HelloWorld' });
```

```deleteField(collection, query, toDelete)```

Deletes a specific field
```javascript
jmongo.deleteField('users', { id: '1' }, { name: '' });
```

```load(collection, query, callback)```

Loads a document with the given query
```javascript
jmongo.load('users', { id: '0' }, (result) => {
    console.log(result);
});
```

```loadAll(collection, callback)```

Loads the whole collection
```javascript
jmongo.loadAll('users', (result) => {
    console.log(result);
});
```