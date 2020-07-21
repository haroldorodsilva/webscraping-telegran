import { Telegraf } from 'telegraf';
import { TelegrafContext } from 'telegraf/typings/context';

interface Chat {
    id: number;
    name?: string;
}

export interface Bot {
    launch: () => Promise<void>; // arrow function
    NotificarUsuarios: (message: string) => void;
}

class Telegran implements Bot {
    private bot: Telegraf<TelegrafContext>;

    private ChatList: Chat[] = [{ id: 707624962, name: 'Haroldo' }];

    constructor() {
        this.bot = new Telegraf(process.env.BOT_TELEGRAN_TOKEN || '');
        this.bot.start(ctx => ctx.reply('Bem vindo ao meu Bot!'));

        this.bot.use(async (ctx, next) => {
            if (ctx.message) {
                const start = new Date().getTime();
                await next();
                const response_time = new Date().getTime() - start;
                const chat_from = `${ctx.message.chat.first_name} (id: ${ctx.message.chat.id})`;
                console.log(
                    `Chat from ${chat_from} (Response Time: ${response_time})`,
                );
            }
        });

        this.bot.command('newuser', async ctx => {
            if (!ctx.message?.chat.id) {
                await ctx.reply(`Chat ID não encontrado`);
                return;
            }

            const find = this.ChatList.find(c => c.id === ctx.message?.chat.id);
            if (find) {
                await ctx.reply(`Usuário já registrado`);
                return;
            }

            this.ChatList.push({
                id: ctx.message?.chat.id,
                name: ctx.message?.chat.first_name,
            });
            await ctx.reply(`Usuário Registrado ✅`);
        });

        this.bot.command('listusers', async ctx => {
            const list = this.ChatList.reduce(
                (acc, { name }) => `${acc}- ${name}\n`,
                '',
            );
            await ctx.reply(list);
        });

        this.bot.command('help', async ctx => {
            await ctx.replyWithHTML(`
            Comandos:
            /newuser
            /listusers`);
        });
    }

    public launch = async (): Promise<void> => {
        return this.bot.launch();
    };

    public NotificarUsuarios = (message: string): void => {
        this.ChatList.map(({ id }) =>
            this.bot.telegram.sendMessage(id, message),
        );
    };
}

export default new Telegran();
