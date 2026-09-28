import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === '') {
        console.log('count=0 sum=0');
        return;
    }

    let totalCount = 0;
    // 合計は64bitの範囲に収まるため、BigIntを使用して計算する
    let totalSum = BigInt(0);

    // カンマで区切って各ランレングスを分割する
    const parts = input.split(',');

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === '') {
            continue;
        }

        // 値と回数をコロンで分割する
        const partsArr = trimmedPart.split(':');

        if (partsArr.length !== 2) {
            // 形式が不正な場合は無視する
            continue;
        }

        const valueStr = partsArr[0].trim();
        const countStr = partsArr[1].trim();

        // 値と回数が有効な整数であるか確認する
        const value = parseInt(valueStr, 10);
        const count = parseInt(countStr, 10);

        if (isNaN(value) || isNaN(count)) {
            // 整数に変換できなかった場合は無視する
            continue;
        }

        // 回数が0以上であることを確認する
        if (count < 0) {
            continue;
        }

        // 合計に加算
        totalCount += count;
        // 合計はBigIntで計算
        totalSum += BigInt(value) * BigInt(count);
    }

    // 結果を出力
    console.log(`count=${totalCount} sum=${totalSum}`);
}

solve();
