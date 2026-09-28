/**
 * 標準入力からカンマ区切りの整数列を受け取り、その要素数と最大値を計算して出力するプログラム。
 */

function solve() {
    const fs = require('fs');

    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("count=0 max=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換しようと試みる
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let validNumbersFound = false;

    for (const part of parts) {
        // 前後の空白を除去
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 整数としてパースを試みる
        const num = parseInt(trimmedPart, 10);

        // 数値として有効であり、かつ64bitの範囲内であるかを確認する（ここではparseIntの結果が安全であれば十分だが、仕様に従い念のため）
        if (!isNaN(num)) {
            // ここで64bitの制約を考慮する必要があるが、JavaScriptのNumber型はIEEE 754倍精度で最大2^53の整数を正確に扱える。
            // 問題文では「64bit整数の範囲」とあるため、安全のため大きな値として扱うことを想定する。
            if (num >= -2**63 && num <= 2**63 - 1) {
                count++;
                if (num > maxValue) {
                    maxValue = num;
                }
                validNumbersFound = true;
            }
        }
    }

    // 要素が一つも有効な整数が見つからなかった場合、最大値は定義されない（ここでは0とするか、適切な値とする。空入力の場合はcount=0 max=0）
    if (!validNumbersFound) {
        console.log("count=0 max=0");
    } else {
        // 64bitの範囲内の最大値を出力
        console.log(`count=${count} max=${maxValue}`);
    }
}

solve();
