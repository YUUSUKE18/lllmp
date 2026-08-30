import * as fs from "fs";

const input = fs.readFileSync(0, "utf8").trim();
if (!input) {
    process.stdout.write("count=0 max=0\n");
    return;
}

const parts = input.split(',');
let count = 0;
let maxValue = -Infinity;
let hasValidNumber = false;

for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // チェック：整数として解釈できるか、64bit範囲内か
    if (!isNaN(num) && Number.isSafeInteger(num)) {
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
        hasValidNumber = true;
    }
}

if (count === 0) {
    // 空の入力または数字が一つもなかった場合、最大値は定義できないが、ここでは安全のため0とする（仕様上は空要素が出ても処理すべき）
    process.stdout.write("count=0 max=0\n");
} else {
    process.stdout.write(`count=${count} max=${maxValue}\n`);
}
