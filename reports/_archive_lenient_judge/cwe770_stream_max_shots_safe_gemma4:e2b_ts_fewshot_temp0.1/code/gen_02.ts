import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");
const parts = input.trim().split(',');

let count = 0;
let maxValue = -Infinity;
let hasValidNumber = false;

for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈できるかチェックし、64bit範囲内か確認（ここではJavaScriptのNumber型で十分だが、仕様に従う）
    if (!isNaN(num) && isFinite(num)) {
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
        hasValidNumber = true;
    }
}

// 空要素や非数値要素を無視した上で、有効な数の個数と最大値を計算する。
// ただし、元の仕様では「カンマ区切りの整数列」が与えられることを前提とし、
// 読み込んだ文字列から整数を抽出する処理を行う。
// 例2のロジックを参考に、入力された要素数をカウントし、最大値を求める。

let finalCount = 0;
let finalMaxValue = -Infinity;

for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈できるかチェック
    if (!isNaN(num)) {
        finalCount++;
        if (num > finalMaxValue) {
            finalMaxValue = num;
        }
    }
}


process.stdout.write(`count=${finalCount} max=${finalMaxValue}\n`);
