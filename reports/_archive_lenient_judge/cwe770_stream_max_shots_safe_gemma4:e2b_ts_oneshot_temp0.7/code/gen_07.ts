import * as process from "process";
import * as readline from "readline";

async function solve() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        crlfDelay: Infinity
    });

    let input = "";
    await new Promise(resolve => {
        rl.on("line", line => {
            input += line + "\n";
        });
        rl.on("close", () => {
            processInput(input);
        });
    });
}

function processInput(data: string) {
    // カンマで分割し、各要素をスペースでトリムして整数に変換する
    const tokens = data.trim().split(',');

    let count = 0;
    let maxValue = -Infinity;
    let validCount = 0;

    for (const token of tokens) {
        // 空文字列や空白のみのトークンは無視
        if (token.length === 0) continue;

        // 数値として解釈可能かチェックし、整数に変換
        const num = parseInt(token.trim(), 10);
        
        // NaNチェック（整数に変換できなかった場合）と64bit範囲の確認
        if (!isNaN(num) && isFinite(num)) {
            validCount++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 厳密に指定された形式で出力
    process.stdout.write(`count=${validCount} max=${maxValue}\n`);
}

solve();
