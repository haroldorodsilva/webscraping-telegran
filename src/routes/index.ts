import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
    req.bot.NotificarUsuarios(`🤖teste`);
    return res.json({ status: 'UP' });
});

export default routes;
