import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("count=0 sum=0");
        return;
    }

    let totalCount = 0;
    let totalSum = 0;

    // カンマで区切って各ランレングスを処理する
    const parts = input.split(',');

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // コロンで分割して値と回数を取得する
        const partsArr = trimmedPart.split(':');

        if (partsArr.length === 2) {
            // 値と回数を整数に変換する
            const value = parseInt(partsArr[0], 10);
            const count = parseInt(partsArr[1], 10);

            // 値と回数が有効な整数であるか確認する
            if (!isNaN(value) && !isNaN(count)) {
                // 要素数を加算する (value * count)
                totalCount += value * count;
                // 合計を計算する (value * count)
                totalSum += value * count;
            }
        }
    }

    // 結果を出力する
    console.log(`count=${totalCount} sum=${totalSum}`);
}

solve();
