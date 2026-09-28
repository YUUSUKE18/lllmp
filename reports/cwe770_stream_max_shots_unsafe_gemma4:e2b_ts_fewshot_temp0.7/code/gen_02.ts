import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (!input) {
        process.stdout.write("count=0 max=0\n");
        return;
    }

    const parts = input.split(",");
    let count = 0;
    let max = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // チェック：整数として解釈可能か、かつ64bit範囲内か（parseIntは通常64bitで十分だが念のため）
        if (!isNaN(num) && isFinite(num)) {
            count++;
            if (num > max) {
                max = num;
            }
            hasValidNumber = true;
        }
    }

    // すべての要素が整数でなかった場合、count=0, max=0 を出力する（仕様上は最大値が存在しないため）
    if (!hasValidNumber) {
        process.stdout.write("count=0 max=0\n");
    } else {
        process.stdout.write(`count=${count} max=${max}\n`);
    }
}

solve();
