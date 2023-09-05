import express from 'express';
import { connection } from '../dbSetup.js';

export const stories = express.Router();

stories.get('/', async (_req, res) => {
    try {
        const selectQuery = `SELECT * FROM stories;`;
        const [selectRes] = await connection.execute(selectQuery);
        const storiesList = selectRes;

        return res.status(200).json({
            status: 'ok',
            list: storiesList,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            msg: 'GET: STORIES API - server error.',
        });
    }
});

stories.use((_req, res, _next) => {
    return res.status(404).json({ msg: 'Unsupported "Stories" method' });
});
