import * as process from 'process';

function solve() {
    // 標準入力全体を読み込む
    const input = process.stdin.readSync();
    
    if (!input) {
        // 入力が空の場合は何もしない
        return;
    }

    // 入力を文字列として処理する
    const inputStr = input.toString().trim();
    
    if (inputStr === "") {
        // 空の入力の場合は何もしない
        return;
    }

    let totalCount = 0;
    let totalSum = 0;

    // カンマで区切って各要素を分割する
    const parts = inputStr.split(',');

    for (const part of parts) {
        // 各要素の前後の空白を無視し、空文字列でないことを確認
        const trimmedPart = part.trim();
        if (trimmedPart === "") {
            continue;
        }

        // コロンで分割して値と回数を取得
        const partsArr = trimmedPart.split(':');
        
        if (partsArr.length === 2) {
            // 値 (value) と回数 (count) を取得
            const value = parseInt(partsArr[0], 10);
            const count = parseInt(partsArr[1], 10);

            // 値が有効な整数であり、回数が0以上であることを確認
            if (!isNaN(value) && !isNaN(count) && count >= 0) {
                // 合計に加算
                totalCount += count;
                totalSum += value * count;
            }
        }
        // 値:回数 の形式に解釈できない要素は無視される
    }

    // 結果を出力
    console.log(`count=${totalCount} sum=${totalSum}`);
}

solve();
