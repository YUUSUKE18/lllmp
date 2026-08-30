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

    // 整数として解釈可能で、64bit範囲内であるかチェック
    if (!isNaN(num) && num >= -2**63 && num <= 2**63 - 1) {
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
    // 入力に有効な整数が一つもなかった場合、count=0, max=-Infinity（または適切なデフォルト値。ここでは-1や0などでも良いが、maxの定義を考慮し-Infinityを使う）を出力する。
    // 課題の意図から見て、要素数と最大値を求めるため、要素がない場合は count=0, maxは無意味になるが、ここでは上記で求めた値を出力する。
    process.stdout.write(`count=${count} max=${maxValue}\n`);
}
