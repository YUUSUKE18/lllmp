import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");

const parts = input.trim().split(',');

let count = 0;
let maxValue = -Infinity;
let hasValidNumber = false;

for (const part of parts) {
    if (part === "") continue;

    const num = parseInt(part);

    // 整数として解釈できるかチェック（NaNでないことと、元の文字列がすべて数字で構成されていることを確認するため、ここでは単純にparseIntの結果をチェックする）
    if (!isNaN(num)) {
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
        hasValidNumber = true;
    }
}

// 整数として解釈できなかった要素は無視される。空要素や空白はsplitで処理されるため、ここでは数値のみをカウントする。
// 仕様に従い、「空でない語の数」と「最大値」を出力する。
process.stdout.write(`count=${count} max=${maxValue}\n`);
