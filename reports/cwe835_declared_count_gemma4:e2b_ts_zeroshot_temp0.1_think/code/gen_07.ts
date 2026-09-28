const fs = require('fs');

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0) {
        console.log('count=0 sum=0');
        return;
    }

    let actualCount = 0;
    let totalSum = 0n; // 合計は64bit整数を考慮し、BigIntを使用する

    // 2行目以降の行をチェックする
    // 1行目は期待される個数だが、実際に読み取れた整数のみを対象とするため、2行目から処理を開始する
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();

        // 空行は無視
        if (line === '') {
            continue;
        }

        // 整数として解釈できるか試みる
        const num = parseInt(line, 10);

        if (!isNaN(num)) {
            // 有効な整数が見つかった場合、カウントと合計を更新する
            actualCount++;
            // 合計に加算する際はBigIntに変換して加算する
            totalSum += BigInt(num);
        }
        // 整数として解釈できない行は無視される
    }

    // 結果を出力する
    console.log(`count=${actualCount} sum=${totalSum}`);
}

solve();
