import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");
const parts = input.trim().split(',');

let count = 0;
let maxValue = -Infinity;
let hasValidNumber = false;

for (const part of parts) {
    if (part === "") continue;

    const num = parseInt(part);

    // 整数として解釈でき、64bit範囲内であるかを確認（ここでは単純に数値として扱う）
    if (!isNaN(num)) {
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
        hasValidNumber = true;
    }
}

// 整数として解釈できなかった要素や空要素は無視される。
// 空要素・前後の空白は無視される（split(',')とtrim()で対応済み）。
if (count > 0) {
    process.stdout.write(`count=${count} max=${maxValue}\n`);
} else {
    // 入力が空または数値が一つもなかった場合、仕様に厳密に従うため何も出力しないか、あるいは適切なデフォルト値を出す。
    // ここでは、入力された要素数と最大値を出力するという指示に基づき、もし有効な数値が一つもなければ0, -Infinityとするのが自然だが、
    // 課題の意図を尊重し、有効なデータがない場合は何もしない（またはcount=0 max=-Infinity）とする。
    // 例として、入力された要素数と最大値を求めるため、何も読み取れなかった場合は空行を出力しない方針で進める。
}
