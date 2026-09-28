import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");

const parts = input.trim().split(',');

let count = 0;
let maxValue = -Infinity;
let hasValidNumber = false;

for (const part of parts) {
    if (part === "") continue;
    const num = parseInt(part);
    
    // 整数として解釈可能かチェックし、64bit範囲内か確認（ここでは単純に数値としての評価のみ）
    if (!isNaN(num) && isFinite(num)) {
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
        hasValidNumber = true;
    }
}

// 整数として解釈できない要素も無視され、空要素・前後の空白は無視される処理が、split(',')とtrim()で実現されている。
// 問題の仕様に合わせて、countとmaxValueを出力する。
if (count === 0) {
    // 要素が一つも無効な整数でなかった場合、最大値は定義されない。
    // ただし、入力された要素が全て無視された場合は count=0, max は未定義となるが、ここでは最大値を計算した結果を出力する。
    // 入力が空またはすべて無効な場合、count=0, maxValue=-Infinityとなる。
}

process.stdout.write(`count=${count} max=${maxValue}\n`);
