/**
 * 標準入力から整数を読み込み、それらの個数と合計を計算して出力するプログラム。
 */

function solve() {
    const input = require('fs').readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0) {
        console.log('count=0 sum=0');
        return;
    }

    // 1行目を個数として読み込む
    const countLine = input[0].trim();
    if (!countLine) {
        console.log('count=0 sum=0');
        return;
    }
    const expectedCount = parseInt(countLine, 10);

    let actualNumbers: number[] = [];

    // 2行目以降を整数として読み取る
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line) {
            const num = parseInt(line, 10);
            // 整数として解釈できたか確認 (NaNでないこと)
            if (!isNaN(num)) {
                // 64bit整数に収まることを前提とするが、ここではそのまま格納
                actualNumbers.push(num);
            }
        }
    }

    // 実際に読み取れた個数と合計を計算する
    const actualCount = actualNumbers.length;
    const sum = actualNumbers.reduce((acc, current) => acc + current, 0);

    // 指定された形式で結果を出力する
    console.log(`count=${actualCount} sum=${sum}`);
}

solve();
