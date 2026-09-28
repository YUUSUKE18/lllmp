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
    let sum: bigint = 0n;

    // 2行目以降を読み取り、整数として処理する
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line === "") {
            continue; // 空行は無視
        }

        const num = parseInt(line, 10);

        // 整数として解釈できるかチェック
        if (!isNaN(num)) {
            // 64bit整数の範囲内か確認（JavaScriptのNumber型は安全だが、念のため）
            // 読み取れた整数だけを対象とする
            actualNumbers.push(num);
            sum += BigInt(num);
        }
    }

    // 実際に読み取れた個数と合計を出力
    const actualCount = actualNumbers.length;
    const actualSum = sum;

    console.log(`count=${actualCount} sum=${actualSum.toString()}`);
}

solve();
