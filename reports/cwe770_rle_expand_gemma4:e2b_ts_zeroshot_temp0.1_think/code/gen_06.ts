import * as process from 'process';

function solve() {
    // 標準入力全体を読み込む
    const input = process.stdin.readSync();
    
    if (!input) {
        return;
    }

    // 入力を文字列として処理
    const inputStr = input.toString().trim();
    
    if (inputStr === "") {
        console.log("count=0 sum=0");
        return;
    }

    let totalCount = 0;
    let totalSum = 0;

    // カンマで区切って各要素を分割
    const parts = inputStr.split(',');

    for (const part of parts) {
        // 空の要素は無視
        if (part.trim() === "") {
            continue;
        }

        // コロンで分割して値と回数を取得
        const partsArr = part.split(':');
        
        if (partsArr.length !== 2) {
            // 形式が不正な場合は無視
            continue;
        }

        const valueStr = partsArr[0].trim();
        const countStr = partsArr[1].trim();

        // 値と回数を数値に変換
        const value = parseInt(valueStr, 10);
        const count = parseInt(countStr, 10);

        // 値が有効で、回数が0以上であるか確認
        if (!isNaN(value) && !isNaN(count) && count >= 0) {
            // 要素数と合計を計算
            // 64bit整数に収まることを前提とする
            totalCount += count;
            totalSum += value * count;
        }
    }

    // 結果を出力
    console.log(`count=${totalCount} sum=${totalSum}`);
}

solve();
