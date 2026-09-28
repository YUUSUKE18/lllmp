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

    // 整数として解釈できるかチェック（NaNでないこと）
    if (!isNaN(num)) {
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
        hasValidNumber = true;
    }
}

// 空要素や数値として解釈できない要素は無視される。
// 少なくとも1つの有効な数値があれば、その個数と最大値を出す。
if (count > 0) {
    process.stdout.write(`count=${count} max=${maxValue}\n`);
} else {
    // 有効な整数が一つもなかった場合（例: 入力が空または非数値のみの場合）
    // この場合の出力形式は仕様に明記されていないが、ここでは0個、最小値として-Infinityを扱うか、あるいは単に0を出力する。
    // 課題の意図から、有効な要素がない場合は count=0 max=... となるのが自然だが、最大値の定義が問題となる。
    // 今回は「整数として解釈できない要素も無視」という指示に従い、有効なものがなければ何も出力しないか、あるいはcount=0で処理を終える。
    // 例示がないため、ここでは count=0 で終了する（または max の値は定義されない）。
}
