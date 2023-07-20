import { MongoClient } from 'mongodb';

const url = 'mongodb+srv://czuluaga17:OwenGZ0816@cluster0.hlmo99o.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'myproject';
let db = null;

// Connect to MongoDB
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
  } else {
    console.log('Connected successfully to MongoDB server');
    // Connect to the 'myproject' database
    db = client.db(dbName);
  }
});

// Create user account
function create(name, email, password) {
  return new Promise((resolve, reject) => {
    const collection = db.collection('users');
    const doc = { name, email, password, balance: 0 };
    collection.insertOne(doc, { w: 1 }, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(doc);
      }
    });
  });
}

// Find user account
function find(email) {
  return new Promise((resolve, reject) => {
    const collection = db.collection('users');
    collection.find({ email: email }).toArray(function (err, docs) {
      if (err) {
        reject(err);
      } else {
        resolve(docs);
      }
    });
  });
}

// Find one user account
function findOne(email) {
  return new Promise((resolve, reject) => {
    const collection = db.collection('users');
    collection
      .findOne({ email: email })
      .then((doc) => resolve(doc))
      .catch((err) => reject(err));
  });
}

// Update user account - deposit/withdraw amount
function update(email, amount) {
  return new Promise((resolve, reject) => {
    const collection = db.collection('users');
    collection.findOneAndUpdate(
      { email: email },
      { $inc: { balance: amount } },
      { returnOriginal: false },
      function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result.value);
        }
      }
    );
  });
}

// Get all user accounts
function all() {
  return new Promise((resolve, reject) => {
    const collection = db.collection('users');
    collection.find({}).toArray(function (err, docs) {
      if (err) {
        reject(err);
      } else {
        resolve(docs);
      }
    });
  });
}

export { create, findOne, find, update, all };
