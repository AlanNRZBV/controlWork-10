import express from 'express';
import cors from 'cors';
import mysqlDb from './mysqlDb';
import { postsRouter } from './routers/posts';
import { newsRouter } from './routers/news';

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use('/news', newsRouter);
app.use('/posts', postsRouter);


const run = async () => {
  await mysqlDb.init();
  app.listen(port, () => {
    console.log(`Server start on ${port} port`);
  });
};

void run();
