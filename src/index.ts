import express from 'express';
import router from './routes';

require('dotenv').config();

const App = express();

App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(router);

App.listen(2000, () => {
  console.log('rodando servidor  em localhost:2000/');
});
