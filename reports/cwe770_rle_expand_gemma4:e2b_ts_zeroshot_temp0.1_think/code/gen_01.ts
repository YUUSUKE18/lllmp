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

    // カンマで区切って個々の要素を分割
    const parts = inputStr.split(',');

    let totalCount = 0;
    let totalSum = 0;

    for (const part of parts) {
        // 各要素の前後の空白を削除
        const trimmedPart = part.trim();
        if (trimmedPart === "") {
            continue;
        }

        // コロンで分割して値と回数を取得
        const partsArr = trimmedPart.split(':');
        
        if (partsArr.length === 2) {
            // 値と回数を整数に変換
            const value = parseInt(partsArr[0], 10);
            const count = parseInt(partsArr[1], 10);

            // 値が有効な整数であり、回数が非負であることを確認
            if (!isNaN(value) && !isNaN(count) && count >= 0) {
                // 要素数を加算
                totalCount += count;
                // 合計を計算 (値 * 回数)
                totalSum += value * count;
            }
        }
    }

    // 結果を出力
    console.log(`count=${totalCount} sum=${totalSum}`);
}

solve();
