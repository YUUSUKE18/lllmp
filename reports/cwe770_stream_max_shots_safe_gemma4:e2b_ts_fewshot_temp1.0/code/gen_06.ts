import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");

const parts = input.trim().split(',');

let count = 0;
let maxValue = -Infinity;
let hasValidNumber = false;

for (const part of parts) {
    // 空文字列や空白を無視
    if (part === "") continue;

    // 整数として解釈可能かチェック（非数字文字が含まれていないか確認）
    let isNumeric = true;
    for (const char of part) {
        if (char < '0' || char > '9') {
            isNumeric = false;
            break;
        }
    }

    if (isNumeric) {
        const num = parseInt(part, 10);
        // 64bit整数の範囲に収まることを想定（JavaScriptのNumberはIEEE 754倍精度だが、ここでは大きな整数として扱う）
        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }
}

// 求められた要素数と最大値を1行で出力
process.stdout.write(`count=${count} max=${maxValue}\n`);
