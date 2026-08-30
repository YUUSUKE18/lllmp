import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、各要素を数値に変換しようとする
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let validCount = 0;

    for (const part of parts) {
        // 前後の空白を無視して整数として解釈できるか試みる
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として有効であり、64bitの範囲内であるかを確認（ここでは単純にNaNチェックと数値としての妥当性を確認）
        if (!isNaN(num)) {
            validCount++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 厳密に count=<個数> max=<最大値> を出力する
    process.stdout.write(`count=${validCount} max=${maxValue}\n`);
}

solve();
