import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");
const parts = input.trim().split(',');

let count = 0;
let maxValue = -Infinity;
let hasValidNumber = false;

for (const part of parts) {
    if (part === "") continue;
    const num = parseInt(part);
    if (!isNaN(num)) {
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
        hasValidNumber = true;
    }
}

// 空要素や非整数を無視した上で、有効な数の数をカウントし最大値を求める。
// 仕様に基づき、カンマ区切りの文字列から整数を抽出し、その個数と最大値を計算する。
// ただし、例示された入力形式が「空白区切り」ではなく「カンマ区切り」であるため、
// カンマで区切られた要素を処理する。

let finalCount = 0;
let finalMax = -Infinity;

for (const part of parts) {
    if (part === "") continue;
    const num = parseInt(part);
    if (!isNaN(num)) {
        finalCount++;
        if (num > finalMax) {
            finalMax = num;
        }
    }
}

process.stdout.write(`count=${finalCount} max=${finalMax}\n`);
