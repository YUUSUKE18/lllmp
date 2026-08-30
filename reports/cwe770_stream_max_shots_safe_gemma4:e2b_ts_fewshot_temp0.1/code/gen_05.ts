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

    // 整数として解釈できるかチェック（NaNでないこと、そして元の文字列が数字のみで構成されていることを確認するため、ここでは単純にparseIntの結果をチェックする）
    if (!isNaN(num)) {
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
        hasValidNumber = true;
    }
}

// 空要素や非整数要素は無視されるため、countとmaxValueが有効な値を持つ場合にのみ出力する。
// 仕様では「空でない語の数」と「最大値」を求めるため、ここでは読み込んだカンマ区切りの要素のうち、有効な整数として解釈できたものの数をカウントし、その最大値を求める。

if (count > 0) {
    process.stdout.write(`count=${count} max=${maxValue}\n`);
} else {
    // 有効な整数が一つもなかった場合（例: 入力が空または非数値のみの場合）
    // このケースの具体的な出力形式の指定がないため、ここでは count=0, max=-Infinity のような値を出力する。
    // ただし、入力が完全に無効な場合は、何も出力しないか、あるいはcount=0 max=...とするのが自然。
    // 例として、読み込んだ有効な要素数と最大値をそのまま出力する。
    process.stdout.write(`count=${count} max=${maxValue}\n`);
}
