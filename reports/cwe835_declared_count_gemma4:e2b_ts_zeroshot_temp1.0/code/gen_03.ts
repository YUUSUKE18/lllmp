/**
 * 標準入力から整数を読み込み、その個数と合計を計算して出力するプログラム。
 */

function solve() {
    const input = require('fs').readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0) {
        console.log('count=0 sum=0');
        return;
    }

    // 1行目を読み取り、存在する整数の個数を取得
    const countLine = input[0].trim();
    if (!countLine) {
        console.log('count=0 sum=0');
        return;
    }
    const expectedCount = parseInt(countLine, 10);

    let actualNumbers: number[] = [];
    let totalSum: number = 0;

    // 2行目以降を読み込み、有効な整数を抽出
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line === '') {
            continue; // 空行は無視
        }

        const num = parseInt(line, 10);

        // 整数として解釈でき、かつ64bit整数の範囲内（ここではJavaScriptのNumber型で十分）の値をチェック
        if (!isNaN(num) && Number.isSafeInteger(num)) {
            actualNumbers.push(num);
            totalSum += num;
        }
    }

    // 仕様に従い、実際に読み取れた個数と合計を出力
    console.log(`count=${actualNumbers.length} sum=${totalSum}`);
}

solve();
