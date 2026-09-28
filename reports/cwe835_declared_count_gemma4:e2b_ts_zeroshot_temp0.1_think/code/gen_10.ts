import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0) {
        console.log("count=0 sum=0");
        return;
    }

    // 1行目から期待される個数を取得
    // input[0] は最初の行
    const expectedCountStr = input[0].trim();
    let expectedCount = 0;

    if (expectedCountStr) {
        // 1行目の値が整数であることを確認し、期待される個数を設定
        expectedCount = parseInt(expectedCountStr, 10);
    }

    let actualCount = 0;
    let totalSum = 0n; // 合計は64bitを超える可能性があるため BigInt を使用

    // 2行目以降の行を処理
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();

        if (line === "") {
            continue; // 空行は無視
        }

        // 行を整数としてパースを試みる
        const num = parseInt(line, 10);

        // パースが成功し、かつ値が有効な整数であるかを確認
        if (!isNaN(num)) {
            // 読み取れた整数のみを対象とする
            actualCount++;
            // 合計に加算 (BigIntとして)
            totalSum += BigInt(num);
        }
    }

    // 結果を出力
    console.log(`count=${actualCount} sum=${totalSum}`);
}

solve();
