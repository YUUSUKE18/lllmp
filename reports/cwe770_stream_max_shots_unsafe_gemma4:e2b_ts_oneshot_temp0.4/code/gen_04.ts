import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、各要素を数値に変換しようとする
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let validNumbersFound = false;

    for (const part of parts) {
        // 前後の空白をトリム
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈可能か、かつ64bit範囲内かを確認（ここではparseIntの結果に依存するが、問題の制約に従う）
        if (!isNaN(num)) {
            // 64bit整数の範囲内であるという制約は、JavaScriptのNumber型で十分カバーされるため、そのまま比較を行う。
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            validNumbersFound = true;
        }
    }

    // 整数として解釈できた要素が一つもなかった場合は、count=0, max=適切な値（ここでは-Infinityまたは0など、問題の意図に従うが、入力がない場合は0とするのが安全）
    if (!validNumbersFound) {
        maxValue = 0; // 入力が空または無効な場合、最大値を0とする
    }

    // 厳密に count=<個数> max=<最大値> を出力
    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
