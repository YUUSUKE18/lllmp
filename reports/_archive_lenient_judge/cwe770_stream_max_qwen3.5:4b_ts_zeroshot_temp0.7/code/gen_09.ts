import { createRequire } from 'module'; // Node.js の createRequire は標準機能ですが、厳密に外部パッケージを使わないため注意が必要です。ただし問題文は「外部パッケージ」を指しているため、core だけを使う必要があります。process.stdin を使えば OK です。// 再考: process.stdin にアクセスするだけで十分です。createRequire は不要です。const readline = require('readline');

async function main() {
    const rl = readline.createInterface({ input: process.stdin });
    
    let data = '';
    while (true) {
        line = await new Promise(resolve => rl.nextLine(line)); // 修正：変数名を文字列にする必要がある。// リファクタリングが必要。

Actually, I need to write clean code directly. No intermediate thoughts in the final output except within the block logic if needed for comments, but better keep it simple and strictly compliant with "no external packages".
