import { Router } from 'express';
import mysqlDb from '../mysqlDb';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Comment } from '../types';

export const commentsRouter = Router();

commentsRouter.get('/', async (req, res, next) => {
  try {
    let query = 'SELECT id, author, content FROM comments';
    const { news_id } = req.query;

    if (news_id) {
      query = 'SELECT id, author, content FROM comments WHERE news_id = ?';
    }

    const [results] = (await mysqlDb.getConnection().query(query, [news_id])) as ResultSetHeader[];

    res.send(results);
  } catch (e) {
    next(e);
  }
});

commentsRouter.post('/', async (req, res, next) => {
  const { news_id } = req.query;

  if (news_id) {
    const [isExist] = (await mysqlDb
      .getConnection()
      .query('SELECT id FROM news WHERE id = ?', [news_id])) as RowDataPacket[];

    if (isExist.length === 0) {
      return res.status(404).send(`There is no news with id: ${news_id}`);
    }

    if (typeof news_id === 'string') {
      const comment: Comment = {
        news_id: parseInt(news_id),
        author: req.body.author,
        content: req.body.content,
      };
      await mysqlDb
        .getConnection()
        .query('INSERT INTO comments (news_id, author, content) VALUES (?, IFNULL(?, DEFAULT(author)),?)', [
          comment.news_id,
          comment.author,
          comment.content,
        ]);
      res.send(`Added comment to news with id: ${news_id}`);
    }
  }

  res.send('No valid url-query');
});

commentsRouter.delete('/:id', async (req, res, next) => {
  try {
    const [result] = (await mysqlDb
      .getConnection()
      .query('DELETE FROM comments WHERE id = ?', [req.params.id])) as ResultSetHeader[];

    const affectedRows = result.affectedRows;

    res.send(affectedRows > 0 ? `Successfully deleted comment with id ${req.params.id}` : 'Something went wrong');
  } catch (e) {
    next(e);
  }
});
