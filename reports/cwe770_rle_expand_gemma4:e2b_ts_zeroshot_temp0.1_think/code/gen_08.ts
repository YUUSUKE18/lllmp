import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input.length === 0) {
        console.log("count=0 sum=0");
        return;
    }

    let totalCount = 0;
    let totalSum = 0;

    // カンマで区切って各要素を処理する
    const parts = input.split(',');

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart.length === 0) {
            continue;
        }

        // コロンで分割して値と回数を取得する
        const partsArr = trimmedPart.split(':');

        if (partsArr.length !== 2) {
            // 値:回数の形式でない場合は無視する
            continue;
        }

        const valueStr = partsArr[0].trim();
        const countStr = partsArr[1].trim();

        // 値と回数を整数に変換する
        const value = parseInt(valueStr, 10);
        const count = parseInt(countStr, 10);

        // 値と回数が有効な整数であり、回数が0以上であることを確認する
        if (!isNaN(value) && !isNaN(count) && count >= 0) {
            // 要素数を加算する (値 * 回数)
            totalCount += value * count;
            // 合計を計算する (値 * 回数)
            totalSum += value * count;
        }
    }

    // 結果を出力する
    console.log(`count=${totalCount} sum=${totalSum}`);
}

solve();
