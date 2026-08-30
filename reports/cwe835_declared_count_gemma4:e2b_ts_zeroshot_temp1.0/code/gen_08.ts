/**
 * 標準入力から整数を読み込み、その個数と合計を計算して出力するプログラム。
 */
function solve() {
    const fs = require('fs');

    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0) {
        console.log("count=0 sum=0");
        return;
    }

    // 1行目から期待される個数を読み込む (最初の行)
    const expectedCountLine = input[0].trim();
    if (!expectedCountLine) {
        console.log("count=0 sum=0");
        return;
    }
    const expectedCount = parseInt(expectedCountLine, 10);

    let actualNumbers: number[] = [];
    let sum: bigint = 0n;

    // 2行目以降をチェック
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line === "") {
            continue; // 空行は無視
        }

        const num = parseInt(line, 10);

        // 整数として解釈できるかチェック
        if (!isNaN(num)) {
            // 64bit整数の範囲内か確認（問題の制約上、読み取れるものは収まる前提だが安全のため）
            // JavaScriptのNumberはIEEE 754倍精度で64bit整数（2^53-1）を正確に扱えるが、
            // BigIntはより大きな範囲を扱うため、ここではBigIntで合計を管理し、
            // 読み取った数値をそのまま扱う。
            const n = BigInt(num);
            actualNumbers.push(n);
            sum += n;
        }
    }

    // 実際に読み取れた個数と合計を出力
    const actualCount = actualNumbers.length;
    const actualSum = sum;

    console.log(`count=${actualCount} sum=${actualSum.toString()}`);
}

solve();
