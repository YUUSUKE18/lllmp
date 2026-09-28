import * as fs from "fs";

const input = fs.readFileSync(0, "utf8").trim();
if (!input) {
    process.stdout.write("count=0 max=0\n");
    return;
}

const parts = input.split(',');
let count = 0;
let maxValue = -Infinity;
let validCount = 0;

for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 数値として解釈できるか確認（浮動小数点数やその他の文字が含まれていないか、整数であることを確認）
    if (!isNaN(num) && String(num) === trimmedPart) {
        validCount++;
        if (num > maxValue) {
            maxValue = num;
        }
    }
}

process.stdout.write(`count=${validCount} max=${maxValue}\n`);
