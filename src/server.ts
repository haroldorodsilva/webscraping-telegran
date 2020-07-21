import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import 'dotenv/config';

import routes from './routes';

import Telegran from './bot/Telegran';

const app = express();

function botMiddleware(req: Request, res: Response, next: NextFunction) {
    req.bot = Telegran;
    next();
}

app.use(express.json());
app.use(botMiddleware);
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    console.error(err);

    return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    });
});

Telegran.launch().then(data => {
    console.log('✔ Bot is running');
    // bot.telegram.sendMessage('File content at:');
});

app.listen(process.env.PORT || 5000, () => {
    console.log('✔ Server is running');
});
