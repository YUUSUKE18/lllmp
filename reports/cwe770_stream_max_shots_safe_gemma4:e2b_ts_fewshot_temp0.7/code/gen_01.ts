import * as fs from "fs";

const input = fs.readFileSync(0, "utf8").trim();
if (!input) {
    process.stdout.write("count=0 max=0\n");
    return;
}

const parts = input.split(',');
let count = 0;
let maxVal = -Infinity;
let validCount = 0;

for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    // 整数として解釈できるかチェックし、64bitの範囲内か確認する（ここでは単純に数値変換を試みる）
    const num = parseInt(trimmedPart, 10);
    if (!isNaN(num) && Number.isSafeInteger(num)) {
        validCount++;
        if (num > maxVal) {
            maxVal = num;
        }
    }
}

process.stdout.write(`count=${validCount} max=${maxVal}\n`);
