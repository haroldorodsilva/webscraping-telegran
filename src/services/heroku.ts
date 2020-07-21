import { CronJob } from 'cron';
import fetch from 'node-fetch';

const url = process.env.URL_APP || null;

if (url) {
    const cronJob = new CronJob('0 */25 * * * *', () => {
        fetch(url).then(res =>
            console.log(`response-ok: ${res.ok}, status: ${res.status}`),
        );
    });

    cronJob.start();
    console.log('✔ Heroku cron started');
}
