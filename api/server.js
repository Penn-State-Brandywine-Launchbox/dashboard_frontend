const { response } = require('express');
const e = require('express');
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://admin:pranavramesh@cluster0.hm4tyyq.mongodb.net';
const dbName = 'psulaunchbox';

// Remove cors nonsense
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// Register to Database
app.post('/register', (req, res) => {

  const uid = req.query.uid;
  const name = req.query.name;
  const email = req.query.email;


  MongoClient.connect(url, (err, client) => {
    if (err) throw err;


    db = client.db(dbName);

    // Make sure user isn't already registered
    const member = db.collection('members').findOne({
      uid: uid
    }).then((member) => {
      if (member) {
        return res.status(400).send('User is already registered');
      }
      // Add the user to the database
      db.collection('members').insertOne({ uid: uid, name: name, email: email, isCheckedIn: false, checkTimestamps: [], resourceUsage: [], trainingComplete: false });

      return res.status(200).send('OK');
    });



  });
});

// Endpoint for collecting user data specifically and rendering it on dashboard
app.post('/dashboard', (req, res) => {
  const uid = req.query.uid;

  if (!uid) return res.status(400).send('No UID provided');

  MongoClient.connect(url, (err, client) => {
    if (err) {
      return res.status(500).send('Error connecting to database');
    }

    db = client.db(dbName);

    // Get user object
    db.collection('members').findOne({
      uid: uid
    }).then((member) => {
      if (!member) {
        return res.status(400).send('User is not registered');
      }
      return res.status(200).send(member);
    });
  });
});

// Endpoint for checking in
app.post('/checkin', (req, res) => {
  const uid = req.query.uid;

  MongoClient.connect(url, (err, client) => {
    if (err) throw err;

    db = client.db(dbName);

    // Make sure user isn't already checked in
    const member = db.collection('members').findOne({
      uid: uid
    }).then((member) => {

      if (member.isCheckedIn) {
        return res.status(400).send('User is already checked in');
      }

    });


    // Update the check-in status in the database
    db.collection('members').updateOne({ uid: uid }, { $set: { isCheckedIn: true } });

    // Add the timestamp to array of check-in timestamps
    db.collection('members').updateOne({ uid: uid }, { $push: { checkTimestamps: Date() } });

    return res.status(200).send('OK');

  });


});

// Fetch users
app.post('/users', (req, res) => {


    MongoClient.connect(url, (err, client) => {
      if (err) throw err;

      db = client.db(dbName);

      db.collection('members').find({}).toArray((err, result) => {
        if (err) throw err;

        return res.status(200).send(result);
      });

    });
  
});

// Endpoint for checking in
app.post('/checkout', (req, res) => {
  const uid = req.query.uid;

  // Check to see if user is checked in
  const member = db.collection('members').findOne({
    uid: uid
  }).then((member) => {

    if (!member.isCheckedIn) {
      return res.status(400).send('User is not checked in');
    }

  });

  // Update the check-in status in the database
  db.collection('members').updateOne({ uid: uid }, { $set: { isCheckedIn: false } });

  // Add the timestamp to array of check-in timestamps
  db.collection('members').updateOne({ uid: uid }, { $push: { checkTimestamps: Date() } });

  return res.status(200).send('OK');


});

// Route for tracking if a member is trained
app.post('/train', (req, res) => {
  const email = req.query.email;

  // Update the training status in the database
  MongoClient.connect(url, (err, client) => {
    if (err) throw err;

    db = client.db(dbName);

    db.collection('members').updateOne({ email
      : email }, { $set: { trainingComplete: true } });
    });
});

app.post('/material', (req, res) => {
  const uid = req.query.uid;
  const material = req.query.material;
  const time = Date();  // current time
  const amount = req.query.amount;  // amount of material in pounds

  // Create a resource usage object
  const resourceUsage = {
    material: material,
    time: time,
    amount: amount
  };

  // Update the material usage in the database by pushing the resourceUsage object to the resourceUsage array
  db.collection('members').updateOne({ uid: uid }, { $push: { resourceUsage: resourceUsage } });
});


// Route for tracking points
app.post('/points', (req, res) => {
  const uid = req.query.uid;
  const points = req.body.points;

  // Update the points in the database
  db.collection('members').updateOne({ uid: uid }, { $inc: { points: points } });
});

app.get('/generatebadge', (req, res) => {
  res.send(`

  <style>
@import url('https://fonts.googleapis.com/css2?family=Unbounded&display=swap');
</style>

<div style="font-family: 'Unbounded', cursive;border: solid 2px; width: 40%; padding: 2%;">
    <h1>Utility.Works</h1>
    <h5>Name: ${req.query.name}</h5>
    <h5>Role: ${req.query.role}</h5>
    <h5>Badge Created: ${Date()}</h5>
    <h5>Membership: ${req.query.membership}</h5>
    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${req.query.name},${req.query.role},${req.query.membership}">
    </div>

  `)
});


// Route for creating badge images
app.get('/badge', (req, res) => {
  const uid = req.query.uid;

  // Create the badge image and send it to the client
  res.send(createBadgeImage(uid));
});

app.listen(3001, () => {
  console.log('API server listening on port 3001');
});
