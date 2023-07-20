import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import authenticateToken from './authMiddleware';
import dal from './dal';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import UserName from './public/UserName';
import UserContext from './public/UserContext';
import { UserContextProvider } from './public/usercontext';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './NavBar'; // Assuming you have a NavBar component defined
import Home from './Home'; // Assuming you have a Home component defined

const app = express();

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Your API',
        version: '1.0.0',
        description: 'API documentation for your application',
      },
    },
    apis: ['./index.js'], // Specify the path to your API routes files
  };

  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

const port = 3000;

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());

const accessTokenSecret = 'somerandomaccesstoken';

const generateAccessToken = user => {
  const payload = {
    username: user.username,
    role: user.role
  };

  const token = jwt.sign(payload, accessTokenSecret, { expiresIn: '20m' });

  return token;
};

app.get('/account/create/:name/:email/:password', authenticateToken, (req, res) => {
  dal.find(req.params.email).then(users => {
    if (users.length > 0) {
      console.log('User already exists');
      res.send('User already exists');
    } else {
      dal.create(req.params.name, req.params.email, req.params.password).then(user => {
        console.log(user);
        res.send(user);
      });
    }
  });
});

app.post('/account/login/:email/:password', (req, res) => {
  dal.find(req.params.email).then(user => {
    if (user.length > 0) {
      if (user[0].password === req.params.password) {
        const accessToken = generateAccessToken(user[0]);
        const refreshToken = generateRefreshToken(user[0]);

        res.json({
          accessToken,
          refreshToken
        });
      } else {
        res.send('Login failed: wrong password');
      }
    } else {
      res.send('Login failed: user not found');
    }
  });
});

app.get('/account/find/:email', authenticateToken, (req, res) => {
  dal.find(req.params.email).then(user => {
    console.log(user);
    res.send(user);
  });
});

app.get('/account/findOne/:email', authenticateToken, (req, res) => {
  dal.findOne(req.params.email).then(user => {
    console.log(user);
    res.send(user);
  });
});

app.get('/account/update/:email/:amount', authenticateToken, (req, res) => {
  const amount = Number(req.params.amount);

  dal.update(req.params.email, amount).then(response => {
    console.log(response);
    res.send(response);
  });
});

app.get('/account/all', authenticateToken, (req, res) => {
  dal.all().then(docs => {
    console.log(docs);
    res.send(docs);
  });
});

function App() {
  return (
    <Router>
      <UserContext.Consumer>
        {({ users }) => (
          <div>
            <NavBar />
            <UserName />
            <Switch>
              <Route exact path="/" component={Home} />
              {/* Other routes */}
            </Switch>
          </div>
        )}
      </UserContext.Consumer>
    </Router>
  );
}

ReactDOM.render(
  <UserContextProvider>
    <App />
  </UserContextProvider>,
  document.getElementById('root')
);

app.listen(port, 3000, () => {
  console.log(`Running on port: ${port}`);
});
