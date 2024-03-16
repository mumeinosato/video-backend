import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import express from 'express';
import cores from 'cors';

dotenv.config();

const app = express();
app.use(cores());

const isDevMode: boolean = process.env.NODE_ENV === 'dev';
const publicPath: string = process.env.PUBLIC_PATH_NAS || path.join(__dirname, 'public');

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('It works!');
});



app.get('/thumbnails', (req, res) => {
    fs.readdir(publicPath, async (err, folders) => {
        if (err) {
            console.error('フォルダ一覧の取得に失敗しました', err);
            res.status(500).send('サーバーエラー');
            return;
        }

        // 各フォルダ内のlogo.pngとフォルダ名を取得して返す
        const thumbnails = [];
        for (const folder of folders) {
            const logoPath = path.join(publicPath, folder, 'logo.png');
            try {
                await fs.promises.access(logoPath);
                thumbnails.push({
                    folder: folder,
                    thumbnailUrl: logoPath
                });
            } catch (error) {
                console.error(`${folder} フォルダ内の logo.png が見つからないためスキップします`);
            }
        }
        res.json(thumbnails);
    });
});


app.listen(3000, () => {
    console.log('Listening on port 3000');
});
