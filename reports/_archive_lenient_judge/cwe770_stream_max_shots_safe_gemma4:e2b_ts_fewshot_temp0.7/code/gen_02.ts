import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");
const parts = input.trim().split(/[\s,]+/).filter(s => s.length > 0);

if (parts.length === 0) {
    process.stdout.write("count=0 max=0\n");
} else {
    let count = 0;
    let max = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        const num = parseInt(part, 10);
        if (!isNaN(num)) {
            count++;
            if (num > max) {
                max = num;
            }
            hasValidNumber = true;
        }
    }

    if (count === 0) {
        // すべての要素が数値でなかった場合、または空の入力の場合
        process.stdout.write("count=0 max=0\n");
    } else {
        process.stdout.write(`count=${count} max=${max}\n`);
    }
}
