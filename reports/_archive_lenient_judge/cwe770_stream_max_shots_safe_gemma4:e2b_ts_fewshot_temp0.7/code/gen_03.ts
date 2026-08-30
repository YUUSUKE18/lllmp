import * as fs from "fs";

const input = fs.readFileSync(0, "utf8").trim();
if (!input) {
    process.stdout.write("count=0 max=0\n");
    process.exit(0);
}

const parts = input.split(',');
let count = 0;
let max = -Infinity;
let validCount = 0;

for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // チェック：整数として解釈できるか、かつ64bit範囲内か
    if (!isNaN(num) && isFinite(num)) {
        // 64bitの制約を考慮するが、JavaScriptのNumberはIEEE 754倍精度で、安全に十分な範囲を持つため、ここでは単純に最大値を更新する
        validCount++;
        if (num > max) {
            max = num;
        }
    }
}

process.stdout.write(`count=${validCount} max=${max}\n`);
