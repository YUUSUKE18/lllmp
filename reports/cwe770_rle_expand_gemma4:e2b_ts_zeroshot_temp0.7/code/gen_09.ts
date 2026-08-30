/**
 * 標準入力からランレングス圧縮列を受け取り、要素数と合計を計算して出力するプログラム。
 */
function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("count=0 sum=0");
        return;
    }

    const parts = input.split(',');
    let totalCount = 0n;
    let totalSum = 0n;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (!trimmedPart) continue;

        const separatorIndex = trimmedPart.indexOf(':');
        if (separatorIndex === -1) continue;

        const valueStr = trimmedPart.substring(0, separatorIndex);
        const countStr = trimmedPart.substring(separatorIndex + 1);

        const value = parseInt(valueStr, 10);
        const count = parseInt(countStr, 10);

        // '値:回数' の形式に解釈できない要素は無視する（ここでは値と回数が数値としてパースできたもののみを対象とする）
        if (isNaN(value) || isNaN(count)) {
            continue;
        }

        if (count >= 0) {
            // 要素数 (count) を加算
            totalCount += BigInt(count);
            
            // 合計 (value * count) を加算
            totalSum += BigInt(value) * BigInt(count);
        }
    }

    // 結果を出力
    console.log(`count=${totalCount.toString()} sum=${totalSum.toString()}`);
}

solve();
