import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");
const tokens = input.trim().split(/[\s,]+/).filter(t => t.length > 0);

if (tokens.length === 0) {
    process.stdout.write("count=0 max=0\n");
} else {
    let count = 0;
    let maxVal = -Infinity;
    let hasValidNumber = false;

    for (const token of tokens) {
        const num = parseInt(token, 10);
        if (!isNaN(num)) {
            count++;
            if (num > maxVal) {
                maxVal = num;
            }
            hasValidNumber = true;
        }
    }

    if (count === 0) {
        // すべてのトークンが整数でなかった場合、カウントは0、最大値は定義されない（ここでは0とする）
        process.stdout.write("count=0 max=0\n");
    } else {
        process.stdout.write(`count=${count} max=${maxVal}\n`);
    }
}
