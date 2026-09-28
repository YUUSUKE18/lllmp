function solve() {
    // 標準入力全体を読み込む
    const fs = require('fs');
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
        if (!trimmedPart) continue;

        // コロンで区切って値と回数を取得する
        const partsValue = trimmedPart.split(':');

        if (partsValue.length === 2) {
            const valueStr = partsValue[0];
            const countStr = partsValue[1];

            // 数値に変換する
            const value = parseInt(valueStr, 10);
            const count = parseInt(countStr, 10);

            // 値と回数が有効な整数であり、回数が0以上であることを確認する
            if (!isNaN(value) && !isNaN(count) && count >= 0) {
                // 要素数を加算
                totalCount += count;
                // 合計値を加算 (値 * 回数)
                totalSum += value * count;
            }
        }
        // フォーマットに合致しない要素は無視される
    }

    // 結果を出力する
    console.log(`count=${totalCount} sum=${totalSum}`);
}

solve();
