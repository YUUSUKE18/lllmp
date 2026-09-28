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

    // 整数として解釈できるかチェック（NaNでないこと、そして元の文字列が純粋な整数表現であること）
    if (!isNaN(num) && String(num) === trimmedPart) {
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
        hasValidNumber = true;
    }
}

// 整数として解釈できなかった要素は無視されるため、countとmaxValueが有効な値を持つ場合にのみ出力する。
// 仕様では「空要素・前後の空白は無視し、整数として解釈できない要素も無視します」とあるため、
// ここでカウントされた要素数と最大値をそのまま出力する。

process.stdout.write(`count=${count} max=${maxValue}\n`);
