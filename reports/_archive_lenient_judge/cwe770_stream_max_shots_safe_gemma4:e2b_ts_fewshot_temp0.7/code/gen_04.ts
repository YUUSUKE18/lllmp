import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");

const tokens = input.trim().split(',');

let count = 0;
let maxVal = -Infinity;
let validCount = 0;

for (const token of tokens) {
    if (token === "") continue;
    const num = parseInt(token);
    // チェック：数値として解釈でき、64bit整数範囲内であるか（ここでは安全のため単純にチェック）
    if (!isNaN(num) && isFinite(num)) {
        validCount++;
        if (num > maxVal) {
            maxVal = num;
        }
    }
}

process.stdout.write(`count=${validCount} max=${maxVal}\n`);
