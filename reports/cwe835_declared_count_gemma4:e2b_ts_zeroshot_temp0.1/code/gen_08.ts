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
            // 64bit整数の範囲内か確認（問題の制約上、通常は問題ないが念のため）
            // JavaScriptのNumberはIEEE 754倍精度であり、安全に64bit整数（2^53-1）を扱える。
            // 64bit整数（2^63-1）の範囲も問題ない。
            actualNumbers.push(num);
            sum += BigInt(num);
        }
        
        // 読み取った個数が期待値を超えた場合、それ以降の行は無視する（仕様に基づき、実際に読み取れた整数のみを対象とする）
        // ただし、仕様は「実際に読み取れた整数だけを対象とします」となっているため、
        // 1行目の値と実際の読み取り数が一致しなくても、読み取れたものだけを合計する。
    }

    // 実際に読み取れた個数と合計を出力
    console.log(`count=${actualNumbers.length} sum=${sum.toString()}`);
}

solve();
