import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");
const parts = input.trim().split(',');

let count = 0;
let maxValue = -Infinity;

for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈できるかチェックし、64bitの範囲内か確認（今回は数値としては十分大きいと仮定）
    if (!isNaN(num)) {
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
    }
}

process.stdout.write(`count=${count} max=${maxValue}\n`);
