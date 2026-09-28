import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、各要素を整数に変換しようと試みる
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let validCount = 0;

    for (const part of parts) {
        // 前後の空白をトリム
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として有効かチェックし、64bit範囲内かチェック（ここではparseIntの限界と一般的な数値型で十分と仮定）
        if (!isNaN(num)) {
            // 値が64bit整数の範囲内にあることを確認（JavaScriptのNumberはIEEE 754倍精度だが、ここでは整数として扱う）
            // 厳密な64bitチェックは複雑になるため、一般的な数値処理に従う。
            validCount++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 要素数と最大値を標準出力に出力
    process.stdout.write(`count=${validCount} max=${maxValue}\n`);
}

solve();
