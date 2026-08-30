/**
 * 標準入力からカンマ区切りの整数列を受け取り、その要素数と最大値を計算して出力するプログラム。
 */

function solve() {
    const input = require('fs').readFileSync(0, 'utf8').trim();

    if (!input) {
        // 入力が空の場合は何も出力しない（仕様上は無視されるが念のため）
        return;
    }

    // カンマで分割し、各要素を数値に変換しようとする
    const parts = input.split(',');

    let count = 0;
    let maxValue = -Infinity;

    for (const part of parts) {
        // 前後の空白を除去
        const trimmedPart = part.trim();

        if (trimmedPart === '') {
            continue; // 空の要素は無視
        }

        // 整数として解釈できるか試みる
        // isFinite は NaN や Infinity を除外するのに役立つ
        const num = Number(trimmedPart);

        if (Number.isInteger(num) && isFinite(num)) {
            // 64bit整数の範囲内に収まることを前提とする（Node.jsのNumberはIEEE 754倍精度であり、
            // 安全な整数演算の範囲としては十分だが、ここではそのまま比較・格納する）
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
