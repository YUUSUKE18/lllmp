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

    // 2行目以降を読み込み、整数として処理する
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line === "") {
            continue; // 空行は無視
        }

        const num = parseInt(line, 10);

        // 整数として解釈できるかチェック
        if (!isNaN(num)) {
            // 64bit整数の範囲内か確認（JavaScriptのNumberはIEEE 754倍精度だが、ここでは安全のためBigIntに変換してチェック）
            // 問題文では「値はいずれも64bit整数の範囲に収まります」とあるため、読み取れた値がその範囲内であると仮定する。
            // 読み取れた値が安全に扱える範囲（2^53程度）であれば問題ないが、厳密に64bit整数として扱うためBigIntで合計を管理する。
            
            // 読み取れた整数を格納
            actualNumbers.push(num);
            
            // 合計を計算 (BigIntとして加算)
            totalSum += BigInt(num);
        }
    }

    // 実際に読み取れた個数と合計を出力
    const actualCount = actualNumbers.length;
    const actualSum = totalSum.toString(); // BigIntを文字列に変換して出力

    console.log(`count=${actualCount} sum=${actualSum}`);
}

solve();
