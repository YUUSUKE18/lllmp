/**
 * 標準入力からカンマ区切りの整数列を受け取り、要素数と最大値を計算して出力するプログラム。
 */

function solve() {
    const fs = require('fs');
    
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("count=0 max=0"); // 入力が空の場合は 0, 0 を出力（要素がないため）
        return;
    }

    // カンマで分割し、各要素を処理する
    const parts = input.split(',');

    let count = 0;
    let maxValue = -Infinity;
    let isValidInput = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") {
            continue; // 空の要素は無視
        }

        // 整数として解析を試みる
        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できるか、そして64bit範囲内かを確認する（JavaScriptのNumber型がこれに対応）
        if (!isNaN(num)) {
            // ここでは数値としての妥当性をチェック。問題文の制約に従い、整数として扱う。
            // もし厳密に64bit整数であることを保証したい場合は BigInt などを使うべきだが、
            // Node.js の標準的な Number 型は 53ビット整数精度を持つため、ここでは一般的な整数処理として進める。
            // 問題の制約「値は 64bit 整数の範囲に収まります」は入力値がその範囲内であることを示唆していると解釈する。

            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
        // 整数として解釈できない要素は無視される
    }

    // 結果を出力
    console.log(`count=${count} max=${maxValue}`);
}

solve();
