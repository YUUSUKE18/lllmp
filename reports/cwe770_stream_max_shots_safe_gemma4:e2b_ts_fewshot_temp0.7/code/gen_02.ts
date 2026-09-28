import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");

const parts = input.trim().split(/[\s,]+/).filter(s => s.length > 0);

if (parts.length === 0) {
    process.stdout.write("count=0 max=-Infinity\n"); // または適切なデフォルト値
} else {
    let count = 0;
    let maxVal = -Infinity;

    for (const part of parts) {
        const num = parseInt(part, 10);
        if (!isNaN(num)) {
            count++;
            if (num > maxVal) {
                maxVal = num;
            }
        }
    }

    // 仕様に従い、要素数と最大値を1行で出力する
    process.stdout.write(`count=${count} max=${maxVal}\n`);
}
