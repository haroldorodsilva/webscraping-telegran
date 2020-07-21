import { Bot } from '../../bot/Telegran';

declare global {
    namespace Express {
        interface Request {
            bot: Bot;
        }
    }
}
