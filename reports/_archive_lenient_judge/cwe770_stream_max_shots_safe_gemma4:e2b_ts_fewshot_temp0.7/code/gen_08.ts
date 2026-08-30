import * as fs from "fs";

const input = fs.readFileSync(0, "utf8").trim();

if (!input) {
    process.stdout.write("count=0 max=0\n");
} else {
    const parts = input.split(',');
    let count = 0;
    let maxVal = -Infinity;
    let validCount = 0;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // チェック: 数値として解釈できるか、64bit範囲内か
        if (!isNaN(num) && Number.isInteger(num)) {
            validCount++;
            if (num > maxVal) {
                maxVal = num;
            }
        }
    }

    process.stdout.write(`count=${validCount} max=${maxVal}\n`);
}
