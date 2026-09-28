import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (!input) {
        process.stdout.write("count=0 max=-Infinity\n"); // 空入力の場合の処理（最大値は定義できないため）
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
        // 整数として解釈でき、64bit範囲内（JavaScriptのNumber型で十分）であるか確認
        if (!isNaN(num) && isFinite(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 整数として解釈できた要素のみをカウントに含める必要があるため、再計算
    let finalCount = 0;
    let finalMaxValue = -Infinity;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);
        if (!isNaN(num) && isFinite(num)) {
            finalCount++;
            if (num > finalMaxValue) {
                finalMaxValue = num;
            }
        }
    }


    process.stdout.write(`count=${finalCount} max=${finalMaxValue}\n`);
}

solve();
