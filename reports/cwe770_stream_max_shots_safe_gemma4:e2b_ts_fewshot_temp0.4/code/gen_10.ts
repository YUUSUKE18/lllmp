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
    if (!isNaN(num) && Number.isSafeInteger(num)) {
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
        hasValidNumber = true;
    }
}

// 整数として解釈できない要素や空要素は無視されるため、countとmaxValueが有効な値を持つ場合にのみ出力する。
// ただし、仕様では「要素数」と「最大値」を求めるため、読み込んだ要素の数をカウントし、有効な数の最大値を求めるのが自然。
// 空要素・前後の空白は無視し、整数として解釈できない要素も無視します。

if (count > 0) {
    process.stdout.write(`count=${count} max=${maxValue}\n`);
} else {
    // 有効な整数が一つも見つからなかった場合（例: 入力が空または全て無効な文字列の場合）
    // この場合、count=0, max=? となるが、最大値の定義に合わせるため、ここでは count=0 で終了する。
    process.stdout.write(`count=0 max=-Infinity\n`); // または適切なデフォルト値を設定するが、ここでは読み込んだ有効な要素のみを考慮する。
}
