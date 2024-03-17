import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import express from 'express';
import cores from 'cors';
import e from 'express';

dotenv.config();

const app = express();
app.use(cores());


function devMode() {
    try {
        fs.accessSync('.env', fs.constants.F_OK);
        return true;
    }catch (error) {
        return false;
    }
}


app.get('/', (req: express.Request, res: express.Response) => {
    res.send('It works!');
});

const publicPath = devMode() ? process.env.DEV_PATH : process.env.PRE_PATH;

app.get('/thumbnails', (req, res) => {
    fs.readdir(publicPath as string, async (err, folders) => {
        if (err) {
            console.error('フォルダ一覧の取得に失敗しました', err);
            res.status(500).send('サーバーエラー');
            return;
        }

        // 各フォルダ内のlogo.pngとフォルダ名を取得して返す
        const thumbnails = [];
        for (const folder of folders) {
            const logoPath = path.join(publicPath as string, folder, 'logo.png');
            try {
                await fs.promises.access(logoPath);
                if(devMode()){
                    const convertPath = logoPath.replace(/\\/g, '/').replace('dev-file/', '../../dev-file/');
                    thumbnails.push({
                        folder: folder,
                        thumbnailUrl: convertPath
                    });
                }else{
                    thumbnails.push({
                        folder: folder,
                        thumbnailUrl: logoPath
                    });
                }
            } catch (error) {
                console.error(`${folder} フォルダ内の logo.png が見つからないためスキップします`);
            }
        }
        res.json(thumbnails);
    });
});

app.get('/checkSubfolder/:folderName', (req, res) => {
    const folderName = req.params.folderName;
    const folderPath = path.join(publicPath as string, folderName);

    fs.readdir(folderPath, async (err, files) => {
        if (err) {
            console.error('サブフォルダ一覧の取得に失敗しました', err);
            res.status(500).send('サーバーエラー');
            return;
        }

        const hasSubfolder = files.some((file) => fs.lstatSync(path.join(folderPath, file)).isDirectory());

        if(hasSubfolder){
            const logoPath = path.join(folderPath, 'logo.png');
            fs.access(logoPath, fs.constants.F_OK, (err) => {
                if(err) {
                    console.error(`${folderName} フォルダ内の logo.png が見つからないためスキップします`);
                    res.json(false);
                } else {
                    if(devMode()){
                        const convertPath = logoPath.replace(/\\/g, '/').replace('dev-file/', '../../dev-file/');
                        res.json({
                            folder: folderName,
                            thumbnailUrl: convertPath
                        });
                    }else{
                        res.json({
                            folder: folderName,
                            thumbnailUrl: logoPath
                        });
                    }
                }
            });
        }else{
            res.json(false);
        }
    });
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
