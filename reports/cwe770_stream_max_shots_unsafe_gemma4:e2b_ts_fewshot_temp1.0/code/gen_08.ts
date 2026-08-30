import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (!input) {
        process.stdout.write("count=0 max=0\n");
        return;
    }

    // カンマで分割し、各要素を整数に変換してフィルタリングする
    const parts = input.split(",");
    let count = 0;
    let maxVal = -Infinity;
    let validCount = 0;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈可能か、そして64bit範囲内かを確認（ここではNumber型で十分）
        if (!isNaN(num)) {
            validCount++;
            if (num > maxVal) {
                maxVal = num;
            }
        }
    }

    process.stdout.write(`count=${validCount} max=${maxVal}\n`);
}

solve();
