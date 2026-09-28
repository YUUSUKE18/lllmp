import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");
const tokens = input.trim().split(',');

let count = 0;
let maxValue = -Infinity;
let hasValidNumber = false;

for (const token of tokens) {
    const trimmedToken = token.trim();
    if (trimmedToken === "") continue;

    // 整数として解釈可能かチェックし、64bit範囲内かチェックする（ここでは安全のため数値変換を試みる）
    const num = parseInt(trimmedToken, 10);

    if (!isNaN(num)) {
        // 値が64bit整数の範囲に収まることを前提とする (JavaScriptのNumberは浮動小数点だが、整数演算と標準的な範囲では問題ない)
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
        hasValidNumber = true;
    }
}

// countが0の場合（有効な整数が一つもなかった場合）や、読み込んだ値に基づき出力する
if (count === 0) {
    // 空の入力または非数値のみの場合
    process.stdout.write(`count=0 max=-Infinity\n`); // または仕様に依存するデフォルト値。ここでは最大値を初期化した値とする。
} else {
    process.stdout.write(`count=${count} max=${maxValue}\n`);
}
