print(
  'Start #################################################################'
);
// Create api_prod_db
db = db.getSiblingDB('api_prod_db');
db.createUser({
  user: 'api_user',
  pwd: 'api1234',
  roles: [{ role: 'readWrite', db: 'api_prod_db' }],
});
db.createCollection('users');
// ##############################

// Create api_dev_db
db = db.getSiblingDB('api_dev_db');
db.createUser({
  user: 'api_user',
  pwd: 'api1234',
  roles: [{ role: 'readWrite', db: 'api_dev_db' }],
});
db.createCollection('users');
db.users.insert({
  _id: '5e9f8f8f8f8f8f8f8f8f8f8',
  name: 'John Doe',
  email: 'something@something.com',
});
// ##############################

// Create api_test_db
db = db.getSiblingDB('api_test_db');
db.createUser({
  user: 'api_user',
  pwd: 'api1234',
  roles: [{ role: 'readWrite', db: 'api_test_db' }],
});
db.createCollection('users');
db.users.insert({
  _id: '5e9f8f8f8f8f',
  first_name: 'John',
  last_name: 'Doe',
  email: 'something@something.com',
  date_of_birth: '2020-01-01',
  address: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
  },
  balance: {
    amount: 100,
    currency: 'USD',
    amount_on_date: [
      {
        date: '2020-01-01',
        amount: 100,
      },
      {
        date: '2020-01-02',
        amount: 200,
      },
      {
        date: '2020-01-03',
        amount: 300,
      },
    ],
  },
});

print('END #################################################################');
