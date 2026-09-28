import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、トリムして空でない要素をフィルタリング
    const parts = input.split(",");
    let count = 0;
    let max = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 整数として解釈できるか試みる
        const num = parseInt(trimmedPart, 10);

        if (!isNaN(num)) {
            count++;
            if (num > max) {
                max = num;
            }
            hasValidNumber = true;
        }
    }

    // 有効な整数が見つかった場合のみ結果を出力する（仕様上、数値がない場合はどう扱うか明確でないが、最大値の計算を正しく行うため）
    if (count > 0) {
        process.stdout.write(`count=${count} max=${max}\n`);
    } else {
        // 数値が一つもなかった場合の処理（例として count=0, max=エラー値、または単に count=0 のみとする）
        // ここでは、最大値が存在しない場合は max を無視しつつ count=0 を出力するのが最も自然。
        process.stdout.write(`count=0 max=0\n`); // 最大値の定義が不明確なため、便宜的に 0 を設定
    }
}

solve();
