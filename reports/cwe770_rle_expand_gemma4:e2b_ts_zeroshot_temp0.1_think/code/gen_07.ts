import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === '') {
        console.log('count=0 sum=0');
        return;
    }

    let totalCount = 0n; // 64bit整数を扱うためBigIntを使用
    let totalSum = 0n;

    // カンマで区切って各要素を処理する
    const parts = input.split(',');

    for (const part of parts) {
        // 値:回数の形式で分割する
        const partsArr = part.split(':');

        if (partsArr.length !== 2) {
            // 形式が不正な場合は無視
            continue;
        }

        const valueStr = partsArr[0].trim();
        const countStr = partsArr[1].trim();

        // 値と回数を数値に変換する
        const value = BigInt(valueStr);
        const count = BigInt(countStr);

        // 回数が0以上であることを確認（仕様上は回数は0以上）
        if (count < 0n) {
            continue;
        }

        // 要素数と合計を計算する
        // 要素数: value * count
        // 合計: value * count
        const elements = value * count;
        const sum = elements;

        // 合計に加算する
        totalCount += elements;
        totalSum += sum;
    }

    // 結果を出力する
    console.log(`count=${totalCount} sum=${totalSum}`);
}

solve();
