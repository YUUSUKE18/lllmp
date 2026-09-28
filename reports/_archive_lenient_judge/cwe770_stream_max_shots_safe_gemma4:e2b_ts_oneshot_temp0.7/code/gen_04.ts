import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (!input) {
        process.stdout.write("count=0 max=0\n");
        return;
    }

    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (!trimmedPart) continue;

        const num = parseInt(trimmedPart, 10);

        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 空の要素や整数として解釈できない要素は無視されるため、
    // 実際に読み込んだ有効な整数の数と最大値を報告する。
    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
