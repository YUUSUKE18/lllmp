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

    // 整数として解釈できるかチェックし、64bit範囲内かチェックする（ここではJavaScriptのNumber型で十分だが、仕様に従う）
    if (!isNaN(num) && isFinite(num)) {
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
        hasValidNumber = true;
    }
}

// 整数として解釈できなかった要素は無視されるため、countとmaxValueが有効な数値のみを反映している。
// 空要素や空白はtrim()とsplit(',')で処理済み。

if (count > 0) {
    process.stdout.write(`count=${count} max=${maxValue}\n`);
} else {
    // 有効な整数が一つもなかった場合、最大値の定義に注意が必要だが、ここでは空の入力に対する一般的な応答として扱う。
    // ただし、仕様上は「要素数と最大値」を求めるため、0個で最大値は未定義となるが、-Infinityまたは適切な値を出力する。
    // 整数列が空の場合、count=0, max=-Infinityとするのが数学的に自然だが、ここでは入力された有効な数値がない場合は何も出力しない（または0と-Infinity）。
    // 例として、もし入力が完全に無効なら count=0, max=0 としても良いかもしれないが、ここでは計算結果のみを出力する。
}
