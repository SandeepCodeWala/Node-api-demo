const fs = require('fs');
const { Collection, Item, Request, Response } = require('postman-collection');

// Create a new collection
const collection = new Collection({
  info: {
    name: 'My Express API',
    description: 'A collection of API endpoints for my Express application'
  }
});

// Define your API endpoints
const endpoints = [
  {
    name: 'Get All Users',
    method: 'GET',
    url: 'http://localhost:3000/users',
    description: 'Get a list of all users',
    headers: [],
    body: null
  },
  {
    name: 'Create Item',
    method: 'POST',
    url: 'http://localhost:3000/api/signup',
    description: 'Create a new user',
    headers: [{ key: 'Content-Type', value: 'application/json' }],
    body: JSON.stringify({ name: 'NewItem', value: 'NewValue' })
  },
  {
    name: 'Get user by ID',
    method: 'GET',
    url: 'http://localhost:3000/api/user/:id',
    description: 'Get an user by ID',
    headers: [],
    body: null
  },
  {
    name: 'Create Item',
    method: 'POST',
    url: 'http://localhost:3000/api/login',
    description: 'login a  user',
    headers: [{ key: 'Content-Type', value: 'application/json' }],
    body: JSON.stringify({ name: 'NewItem', value: 'NewValue' })
  }
 
];

// Add endpoints to the collection
endpoints.forEach(endpoint => {
  const item = new Item({
    name: endpoint.name,
    request: new Request({
      method: endpoint.method,
      header: endpoint.headers,
      url: endpoint.url,
      description: endpoint.description,
      body: endpoint.body ? { mode: 'raw', raw: endpoint.body } : undefined
    }),
    response: []
  });

  collection.items.add(item);
});

// Save the collection to a JSON file
fs.writeFileSync('MyExpressAPI.postman_collection.json', JSON.stringify(collection.toJSON(), null, 2));

console.log('Postman collection generated successfully.');
