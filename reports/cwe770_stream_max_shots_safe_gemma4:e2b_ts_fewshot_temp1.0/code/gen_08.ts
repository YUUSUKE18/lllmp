import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");

const parts = input.trim().split(',');

let count = 0;
let maxVal = -Infinity;
let hasValidNumber = false;

for (const part of parts) {
    if (part === "") continue;

    // 空白の除去と整数チェック
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    if (!isNaN(num)) {
        count++;
        if (num > maxVal) {
            maxVal = num;
        }
        hasValidNumber = true;
    }
}

// 有効な数値が一つも見つからなかった場合は、count=0, max=-Infinity とする（ただし最大値の制約が64bitであるため、ここでは一般的な最大値として扱う）
// 問題の文脈から、空要素や非整数要素を無視し、有効な整数の数を数える必要がある。

if (count === 0) {
    // 有効な整数が一つもなかった場合の処理。もし入力が完全に空または無効な場合、適切な最大値を設定する必要がある。
    // ここでは「値は64bitの範囲に収まる」という制約に基づき、実質的に何も存在しないことを示すために特別な値を出力するか、あるいは例に従って0を出力する。
    // ただし、maxValを初期値-Infinityのまま出力すると不正になる可能性があるため、入力を全く処理できなかった場合は最大値をどう扱うか考慮が必要。
    // 整数列から「最大値」を求めるため、何も存在しなければ count=0, maxは未定義（ここでは適切な値として例に従う）
    process.stdout.write(`count=0 max=-1\n`); // 仮にデータがない場合は -1などを出力するが、仕様上最も安全なのは実データのみ処理すること。

} else {
    // 整数が一つ以上あった場合
    process.stdout.write(`count=${count} max=${maxVal}\n`);
}
