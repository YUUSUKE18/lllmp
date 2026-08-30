import * as fs from "fs";

const s = fs.readFileSync(0, "utf8");
const parts = s.split(",");
let count = 0;
let max = -Infinity;
let hasValidNumber = false;

for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);
    if (!Number.isNaN(num)) {
        count++;
        if (num > max) {
            max = num;
        }
        hasValidNumber = true;
    }
}

if (count > 0) {
    process.stdout.write(`count=${count} max=${max}\n`);
} else {
    // 整数が存在しない場合は、仕様上は最大値の定義が曖昧だが、ここでは count=0, max=-Infinity となるように処理する。
    // ただし、問題文の例に従い、空要素や無効な要素を無視した場合、カウントと最大値を出力すればよい。
    // ここではcount=0, maxは初期値のままとなる。
    process.stdout.write(`count=${count} max=${max}\n`);
}
