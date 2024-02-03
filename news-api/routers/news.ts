import { Router } from 'express';
import mysqlDb from '../mysqlDb';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { imagesUpload } from '../multer';
import { News } from '../types';

export const newsRouter = Router();

newsRouter.get('/', async (req, res, next) => {
  try {
    const [results] = (await mysqlDb
      .getConnection()
      .query('SELECT id, title, image, created_at FROM news')) as RowDataPacket[];
    res.send(results);
  } catch (e) {
    next(e);
  }
});

newsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const news: News = {
      title: req.body.title,
      content: req.body.content,
      image: req.file ? req.file.filename : null,
    };

    const [result] = (await mysqlDb
      .getConnection()
      .query('INSERT INTO news (title, content, image) ' + 'VALUES (?,?,?)', [
        news.content,
        news.content,
        news.image,
      ])) as ResultSetHeader[];

    res.send({
      ...news,
      id: result.insertId,
    });
  } catch (e) {
    next(e);
  }
});

newsRouter.get('/:id', async (req, res, next) => {
  try {
    const [result] = (await mysqlDb
      .getConnection()
      .query('SELECT * FROM news WHERE id = ?', [req.params.id])) as RowDataPacket[];

    res.send(result[0] ? result : `News with id: ${req.params.id} doesnt exist`);
  } catch (e) {
    next(e);
  }
});

newsRouter.delete('/:id', async (req, res, next) => {
  try {
    const [isExist] = (await mysqlDb
      .getConnection()
      .query('SELECT id FROM news WHERE id = ?', [req.params.id])) as RowDataPacket[];

    if (isExist.length === 0) {
      return res.status(404).send(`There is no item with id: ${req.params.id}`);
    }

    await mysqlDb.getConnection().query('DELETE FROM news WHERE id = ?', [req.params.id]);
    res.send(`News with id: ${req.params.id} from table 'news' has been deleted`);
  } catch (e) {
    next(e);
  }
});
