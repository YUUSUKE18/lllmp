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
    if (!isNaN(num) && Number.isSafeInteger(num)) {
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
    // 有効な整数が一つもなかった場合、count=0, max=? となるが、最大値の定義に合わせるため、ここでは0を出力する。
    // ただし、問題文の制約から、入力が空または非数値のみの場合を想定し、計算結果を出力する。
    // 厳密には「要素数と最大値」を求めるので、有効な要素がない場合は count=0, max=（未定義だがここでは-Infinityや0など）となる。
    // 例として、入力が空だった場合も処理を続ける。
    process.stdout.write(`count=0 max=-Infinity\n`); // または適切なデフォルト値
}
