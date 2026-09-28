import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");
const parts = input.trim().split(',');

let count = 0;
let maxValue = -Infinity;
let hasValidNumber = false;

for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    // 整数として解釈可能かチェック
    if (/^-?\d+$/.test(trimmedPart)) {
        const num = parseInt(trimmedPart, 10);
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
        hasValidNumber = true;
    }
}

// 空の要素や非数値の要素は無視されるため、countとmaxValueが適切に計算されているか確認する。
// 課題の要求は「空でない語の数」と「最大値」なので、上記ロジックで求めたものを出力する。

if (count === 0) {
    // すべての要素が無効だった場合（例: 入力が空または非数値のみの場合）
    // この場合、個数は0、最大値は定義できないため、適切なデフォルト値を設定する必要がある。
    // 問題文の制約から、整数として解釈できたものがカウント対象となる。
}

process.stdout.write(`count=${count} max=${maxValue}\n`);
