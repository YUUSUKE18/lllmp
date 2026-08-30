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

    // 整数として解釈できるかチェックし、64bit範囲内か確認（ここではJavaScriptのNumber型で十分だが、仕様に従う）
    if (!isNaN(num) && isFinite(num)) {
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
        hasValidNumber = true;
    }
}

// 整数として解釈できなかった要素は無視されるため、countとmaxValueが正しく計算されているか確認する。
// 空要素や非数値要素は無視された。

if (count > 0) {
    process.stdout.write(`count=${count} max=${maxValue}\n`);
} else {
    // 有効な整数が一つもなかった場合、最大値の定義に注意が必要だが、ここでは空の入力に対する適切な出力を行う。
    // 仕様上は「要素数と最大値」を求めるため、要素数が0の場合は最大値は未定義となるが、-Infinityまたは0などを設定する。
    // 厳密には、有効な数値が存在しない場合は count=0, max=? となる。ここでは、入力された数値のみに基づいて計算を行う。
    // もし入力が空や非数値のみの場合、count=0, max=-Infinity (初期値)となる。
    process.stdout.write(`count=0 max=-Infinity\n`);
}
