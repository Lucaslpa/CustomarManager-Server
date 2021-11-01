import express from 'express';
import cors from 'cors';
import router from './routes';

require('dotenv').config();

const App = express();
App.use(cors({ origin: ['https://angry-pasteur-1377c4.netlify.app'] }));
App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(router);

const PORT = process.env.PORT || 2000;
App.listen(PORT, () => {
  console.log('rodando servidor em : localhost:2000/');
});
