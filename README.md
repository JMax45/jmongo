# Installation
Using npm: 
```bash
npm i jmongo
```
Usage:
```
const JMongo = require('jmongo');
const jmongo = new JMongo(databaseUrl, dbname);
```
Functions:

```changeDocument(collection, query, newValues);```
```javascript
jmongo.changeDocument('users', { id: '1' }, { name: 'HelloWorld' });
// sets the name attribute to: 'Hello World'
```

```deleteField(collection, query, toDelete)```
```javascript
jmongo.deleteField('users', { id: '1' }, { name: '' });
// deletes the name field
```

```load(collection, query, callback)```
```javascript
jmongo.load('users', { id: '0' }, (result) => {
    console.log(result);
    // loads the document with the given query
});
```
