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

if (count > 0) {
    process.stdout.write(`count=${count} max=${maxValue}\n`);
} else {
    // 入力が空または数値が一つもなかった場合（仕様上は count=0 max=... となるべきだが、最大値の初期値に依存する）
    // ここでは、読み込んだ有効な要素がない場合は、count=0, max=-Infinity を出力する。
    process.stdout.write(`count=0 max=-Infinity\n`);
}
