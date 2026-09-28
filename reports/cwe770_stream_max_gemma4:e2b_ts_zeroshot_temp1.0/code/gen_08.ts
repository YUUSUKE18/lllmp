/**
 * 標準入力からカンマ区切りの整数列を受け取り、要素数と最大値を計算して出力するプログラム。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("count=0 max=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換しようと試みる
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let validCount = 0;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === '') {
            continue; // 空の要素は無視
        }

        // 整数として解析を試みる
        const num = parseInt(trimmedPart, 10);

        // isNaNチェックと64bit範囲チェック（ここではJavaScriptの安全性を考慮し、標準的な数値を扱う）
        if (!isNaN(num)) {
            // 数値が64bit整数に収まるか確認（実際にはJavaScriptのNumber型で十分だが、仕様に従う）
            // 64bit整数 (2^53 - 1) は安全。ここでは最大値を求めるため、通常の数値として扱う。
            validCount++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
        // 整数として解釈できない要素は無視される（isNaNの場合）
    }

    // 要素数と最大値を計算し、出力する
    console.log(`count=${validCount} max=${maxValue}`);
}

solve();
