print(
  'Start #################################################################'
);
// Create api_test_db
db = db.getSiblingDB('api_test_db');
db.createUser({
  user: 'api_user',
  pwd: 'api1234',
  roles: [{ role: 'readWrite', db: 'api_test_db' }],
});
db.createCollection('users');
db.users.insert({
  _id: new ObjectId(),
  username: 'fish123',
  first_name: 'John',
  last_name: 'Doe',
  email: 'something@something.com',
  date_of_birth: '01-02-2020',
  address: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
  },
  balance: {
    amount: 100,
    currency: 'USD',
    last_deposit: 100,
  },
});

print('END #################################################################');
