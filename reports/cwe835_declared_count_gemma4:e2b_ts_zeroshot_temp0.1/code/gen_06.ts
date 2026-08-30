/**
 * 標準入力から整数を読み込み、その個数と合計を計算して出力するプログラム。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0) {
        // 入力が空の場合は何もしない
        return;
    }

    // 1行目から読み取る（期待される個数）
    const expectedCountLine = input[0].trim();
    if (!expectedCountLine) {
        // 1行目が空の場合は処理終了
        return;
    }
    const expectedCount = parseInt(expectedCountLine, 10);

    let actualNumbers: number[] = [];
    let totalSum: bigint = 0n;
    let lineNumber = 1;

    // 2行目以降を読み込み、整数として処理する
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line === "") {
            // 空行は無視
            continue;
        }

        const num = parseInt(line, 10);

        // 整数として解釈できるかチェック
        if (!isNaN(num)) {
            // 64bit整数の範囲内か確認（念のため、問題の制約に従う）
            // JavaScriptのNumberはIEEE 754倍精度であり、安全に64bit整数（2^53-1）を扱えるが、
            // 64bit整数（2^63-1）の範囲も考慮する。ここでは読み取れた値をそのまま扱う。
            // 読み取れた値が64bit範囲内であるという前提で計算を進める。
            actualNumbers.push(num);
            totalSum += BigInt(num);
        }
        // 実際に読み取れた個数が期待値と一致しない場合でも、読み取れたものだけを対象とする。
    }

    // 実際に読み取れた個数と合計を出力
    const actualCount = actualNumbers.length;
    const actualSum = totalSum.toString(); // BigIntを文字列に変換して出力

    console.log(`count=${actualCount} sum=${actualSum}`);
}

solve();
