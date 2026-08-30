import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (!input) {
        process.stdout.write("count=0 max=0\n");
        return;
    }

    // カンマで分割し、各要素を数値に変換しようとする
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let validCount = 0;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 数値として有効かチェックし、64bit範囲内かチェックする（ここではJavaScriptのNumberで十分だが、仕様に従う）
        if (!isNaN(num) && isFinite(num)) {
            validCount++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 要素数と最大値を計算して出力
    process.stdout.write(`count=${validCount} max=${maxValue}\n`);
}

solve();
