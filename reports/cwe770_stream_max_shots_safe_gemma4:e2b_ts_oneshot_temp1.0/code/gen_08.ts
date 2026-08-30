import * as fs from "fs";

function solve() {
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

        const num = parseInt(trimmedPart, 10);
        if (!isNaN(num)) {
            // ここで整数として解釈できるもののみを数え、最大値を求める
            validCount++;
            if (num > maxVal) {
                maxVal = num;
            }
        }
    }

    process.stdout.write(`count=${validCount} max=${maxVal}\n`);
}

solve();
