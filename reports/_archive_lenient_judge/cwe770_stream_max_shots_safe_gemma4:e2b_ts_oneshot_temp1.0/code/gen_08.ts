import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (!input) {
        process.stdout.write("count=0 max=-Infinity\n"); // または適切なデフォルト値。ここでは、空入力ならcount=0 maxの定義がないため、最大値が意味を持たないことを考慮し-Infinityとするか、問題文の制約に従う必要がある。今回は数値を想定するため、データがない場合はcount=0で出力する。
        return;
    }

    const parts = input.split(',');
    let count = 0;
    let max = -Infinity;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈でき、かつ64bit範囲内か確認（ここではNumber型で十分扱う）
        if (!isNaN(num)) {
            // 値が64bit整数の範囲内に収まることを前提とする (JavaScriptのNumberは浮動小数点だが、整数範囲は非常に広い)
            count++;
            if (num > max) {
                max = num;
            }
        }
    }

    // 最終的な出力
    process.stdout.write(`count=${count} max=${max}\n`);
}

solve();
