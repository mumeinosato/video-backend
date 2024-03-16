"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
dotenv.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const isDevMode = process.env.NODE_ENV === 'dev';
const publicPath = isDevMode ? process.env.PUBLIC_PATH_Y || '' : process.env.PUBLOIC_PATH_NAS || '';
app.get('/', (req, res) => {
    res.send('It works!');
});
app.get('/thumbnails', (req, res) => {
    fs.readdir(publicPath, (err, folders) => __awaiter(void 0, void 0, void 0, function* () {
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
                yield fs.promises.access(logoPath);
                thumbnails.push({
                    folder: folder,
                    thumbnailUrl: logoPath
                });
            }
            catch (error) {
                console.error(`${folder} フォルダ内の logo.png が見つからないためスキップします`);
            }
        }
        res.json(thumbnails);
    }));
});
app.listen(3000, () => {
    console.log('Listening on port 3000');
});
