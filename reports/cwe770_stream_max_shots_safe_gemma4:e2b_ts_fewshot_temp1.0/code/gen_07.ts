import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");

const parts = input.trim().split(',');

let count = 0;
let maxValue = -Infinity;
let hasValidNumber = false;

for (const part of parts) {
    // 空文字や空白のみの要素を無視する
    if (part.length === 0) continue;

    const num = parseInt(part);

    // 整数として解釈できるか確認し、64bit範囲内か確認する（ここでは安全のためチェック）
    if (!isNaN(num) && isFinite(num)) {
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
        hasValidNumber = true;
    }
}

// 整数として解釈できた要素のみをカウントする、という要件の解釈に基づき、上記ロジックで求めた count と maxValue を出力する。
// 仕様: 「要素数」と「最大値」を求める。空要素・前後の空白は無視し...

// より厳密に「整数として解釈できた要素の数」と「その中での最大値」を求めるように修正し、最終的な出力を生成する。

let finalCount = 0;
let finalMaxValue = -Infinity;

for (const part of parts) {
    if (part.length === 0) continue;

    const num = parseInt(part);

    if (!isNaN(num) && isFinite(num)) {
        finalCount++;
        if (num > finalMaxValue) {
            finalMaxValue = num;
        }
    }
}

process.stdout.write(`count=${finalCount} max=${finalMaxValue}\n`);
