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

// 整数として解釈できない要素や空要素は無視される。
// 空要素・前後の空白は無視され、整数として解釈できない要素も無視される。
if (count > 0) {
    process.stdout.write(`count=${count} max=${maxValue}\n`);
} else {
    // 有効な整数が一つもなかった場合（空入力や非数値のみの場合）
    // 仕様上、ここでは count=0, max=-Infinity となるが、
    // 厳密に「要素数と最大値」を求めるため、有効な要素がない場合は適切な値を出す。
    // ただし、例示された動作に従い、もし何も見つからなかった場合は、count=0, maxの初期値（-Infinity）になる。
    // ここでは、入力が空または無効な場合でも、読み取った要素数と最大値を報告する。
    process.stdout.write(`count=0 max=-Infinity\n`);
}
