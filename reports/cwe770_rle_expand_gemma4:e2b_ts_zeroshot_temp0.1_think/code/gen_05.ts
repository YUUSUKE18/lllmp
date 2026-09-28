import * as fs from 'fs';

function solve() {
    // 標準入力からデータを読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("count=0 sum=0");
        return;
    }

    let totalCount = 0;
    let totalSum = 0;

    // 入力をカンマで分割し、各ランレングスを処理する
    const parts = input.split(',');

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 値と回数をコロンで分割する
        const partsArr = trimmedPart.split(':');

        if (partsArr.length === 2) {
            const valueStr = partsArr[0].trim();
            const countStr = partsArr[1].trim();

            // 数値に変換を試みる
            const value = parseInt(valueStr, 10);
            const count = parseInt(countStr, 10);

            // 値と回数が有効な整数であるか確認
            if (!isNaN(value) && !isNaN(count) && count >= 0) {
                // 要素数 (回数の合計) を加算
                totalCount += count;

                // 合計 (値 * 回数) を加算
                // 64bit整数に収まることを前提とする
                totalSum += value * count;
            }
        }
    }

    // 結果を出力
    console.log(`count=${totalCount} sum=${totalSum}`);
}

solve();
