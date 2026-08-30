import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");

const tokens = input.split(',');
let count = 0;
let maxValue = -Infinity;

for (const token of tokens) {
    const trimmedToken = token.trim();
    if (trimmedToken === "") continue;

    const num = parseInt(trimmedToken, 10);

    // 整数として解釈でき、64bit範囲内であるか確認（ここでは単純に整数であればOKとする）
    if (!isNaN(num)) {
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
    }
}

process.stdout.write(`count=${count} max=${maxValue}\n`);
