import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで区切られた文字列を読み込み、空白や空要素を無視して整数配列に変換する
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let hasNumbers = false;

    for (const part of parts) {
        // 前後の空白を除去
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);
        
        // 整数として解釈できるかチェックし、64bit範囲内か確認（実際にはJSのNumberは53bit精度だが、問題の制約に従う）
        if (!isNaN(num)) {
            // 値が64bit整数の範囲に収まることを前提とする (Node.jsのNumber型で十分)
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasNumbers = true;
        }
    }

    // 結果を出力
    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
