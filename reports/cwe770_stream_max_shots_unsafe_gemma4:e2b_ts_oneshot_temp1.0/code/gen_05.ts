import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、空要素や空白を無視して整数に変換する
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;

    for (const part of parts) {
        // 前後の空白を削除
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈でき、かつ64bitの範囲内（念のため）であるかチェック
        if (!isNaN(num) && isFinite(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 結果を標準出力に出力
    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
