import express from 'express';
const fetch = require("node-fetch");
let cache = {};  

export default (app, http) => {
  app.use(express.json());
  
  app.get('/users', (req, res) => {
    let location = req.query.location;
    let result = cache[location];

    if (result != null) {
      res.send(result);
    } else {
      fetch('https://api.github.com/search/users?q=location:' + location).then(res => res.json())
      .then(json => {
        cache[location] = json;
        res.send(json);
      })
      .catch(err => {
        res.send(202);
      });
    }
  });
  
  app.get('/user', (req, res) => {
    let username = req.query.name;
    let result = cache[username];

    if (result != null) {
      res.send(result);
    } else {
      fetch('https://api.github.com/users/' + username).then(res => res.json())
      .then(json => {
        cache[username] = json;
        res.send(json);
      })
      .catch(err => {
        res.send(202);
      });
    }
  });
}

// eslint-disable-next-line no-console
console.log('test')