import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");

const tokens = input.trim().split(',');
let count = 0;
let maxVal = -Infinity;
let validCount = 0;

for (const token of tokens) {
    const trimmedToken = token.trim();
    if (trimmedToken === "") continue;

    const num = parseInt(trimmedToken, 10);

    // チェック：整数として解釈できるか、64bit範囲内か（ここではJavaScriptのNumber型で十分）
    if (!isNaN(num)) {
        validCount++;
        if (num > maxVal) {
            maxVal = num;
        }
    }
}

process.stdout.write(`count=${validCount} max=${maxVal}\n`);
