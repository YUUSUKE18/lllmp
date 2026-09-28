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

    // 整数として解釈可能かチェック（NaNでないこと、そして元の文字列が純粋な整数表現であることを確認するため、ここでは単純にparseIntの結果をチェックする）
    if (!isNaN(num)) {
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
        hasValidNumber = true;
    }
}

// 整数として解釈できなかった要素は無視される。
// 空要素や前後の空白はtrim()で処理される。
// 64bit整数の範囲内であるという制約は、JavaScriptのNumber型（IEEE 754倍精度浮動小数点数）が安全に扱える範囲内であるため、特に明示的なチェックは省略する。

process.stdout.write(`count=${count} max=${maxValue}\n`);
