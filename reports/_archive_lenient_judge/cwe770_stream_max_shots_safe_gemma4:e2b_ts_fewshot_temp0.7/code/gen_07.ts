import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");
const tokens = input.trim().split(',');

let count = 0;
let maxValue = -Infinity;
let validCount = 0;

for (const token of tokens) {
    const trimmedToken = token.trim();
    if (trimmedToken === "") continue;

    const num = parseInt(trimmedToken, 10);
    
    // 整数として解釈でき、64bit範囲内であるかを確認（ここではJavaScriptの標準的なNumberで十分と仮定）
    if (!isNaN(num) && isFinite(num)) {
        validCount++;
        if (num > maxValue) {
            maxValue = num;
        }
    }
}

process.stdout.write(`count=${validCount} max=${maxValue}\n`);
