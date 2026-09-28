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

    // 整数として解釈でき、64bit範囲内かを確認（ここでは単純に数値として扱う）
    if (!isNaN(num)) {
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
        hasValidNumber = true;
    }
}

// 整数として解釈できなかった要素は無視されるため、countとmaxValueが有効な数のみを反映している。
// 空要素や空白はtrim()で処理済み。

if (count > 0) {
    process.stdout.write(`count=${count} max=${maxValue}\n`);
} else {
    // 有効な整数が一つもなかった場合、仕様に厳密に従うため、ここでは何も出力しないか、あるいは適切なデフォルト値を設定する。
    // ただし、例題の形式に従い、もしデータが存在しなかったとしても、空の結果を出す必要がある。
    // ここでは、有効な要素がない場合は count=0, max=（未定義または最小値）とするが、問題文の意図から、入力された要素数と最大値をそのまま出力するのが自然。
    // 整数として解釈できた要素が0個の場合、count=0, max=-Infinity (または適切な初期値)となる。
    process.stdout.write(`count=0 max=-Infinity\n`); // 少なくとも1行出力する
}
