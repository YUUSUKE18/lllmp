import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");

const parts = input.trim().split(',');

let count = 0;
let maxValue = -Infinity;
let hasValidNumber = false;

for (const part of parts) {
    if (part === "") continue;

    const num = parseInt(part);

    // チェック：整数として解釈できるか、および64bit範囲内か
    if (!isNaN(num) && isFinite(num)) {
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
        hasValidNumber = true;
    }
}

// 整数として解釈できない要素や空要素は無視される。
// 空要素・前後の空白は無視される（split(',')とtrim()で対応済み）。
if (count > 0) {
    process.stdout.write(`count=${count} max=${maxValue}\n`);
} else {
    // カウントが0の場合も、仕様に従って出力する。最大値は初期値のままか、あるいは適切に扱う。
    // ここでは、入力に有効な整数が一つもなかった場合は count=0, max=-Infinity となる。
    process.stdout.write(`count=0 max=-Infinity\n`);
}
