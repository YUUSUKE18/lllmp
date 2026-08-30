import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");
const tokens = input.trim().split(',');

let count = 0;
let maxVal = -Infinity;
let hasValidNumber = false;

for (const token of tokens) {
    if (token === "") continue;

    // 空白を無視し、整数として解釈可能か確認
    const num = parseInt(token.trim(), 10);

    if (!isNaN(num)) {
        count++;
        if (num > maxVal) {
            maxVal = num;
        }
        hasValidNumber = true;
    }
}

// 有効な数値が見つかった場合のみ結果を出力する（仕様上は空要素無視が主だが、ここでは読み込んだ要素数と最大値を報告する）
if (count > 0) {
    process.stdout.write(`count=${count} max=${maxVal}\n`);
} else {
    // 数値が存在しない場合のデフォルト出力（例えば count=0 max=-Infinity など）
    // ただし、入力が完全に空や無効な場合も考慮し、読み込んだ要素数と最大値を報告する。
    process.stdout.write(`count=${count} max=${maxVal}\n`);
}
