import * as process from 'process';

function solve() {
    // 標準入力全体を読み込む
    const input = process.stdin.readSync();
    
    if (!input) {
        // 入力が空の場合は何もしない
        return;
    }

    // 入力を文字列として処理
    const inputStr = input.toString().trim();
    
    if (inputStr === "") {
        // 入力が空文字列の場合は何もしない
        return;
    }

    let totalCount = 0;
    let totalSum = 0;

    // カンマで区切って各要素を分割
    const segments = inputStr.split(',');

    for (const segment of segments) {
        // 空のセグメントや空白を無視
        const trimmedSegment = segment.trim();
        if (trimmedSegment === "") {
            continue;
        }

        // コロンで値と回数を分割
        const parts = trimmedSegment.split(':');

        if (parts.length === 2) {
            // 値と回数を数値に変換
            const value = parseInt(parts[0], 10);
            const count = parseInt(parts[1], 10);

            // 値と回数が有効な整数であるか確認
            if (!isNaN(value) && !isNaN(count)) {
                // 要素数を加算
                totalCount += count;
                
                // 合計を計算し加算 (64bit整数に収まることを前提とする)
                totalSum += value * count;
            }
        }
        // 値:回数 の形式に解釈できない要素は無視される
    }

    // 結果を出力
    console.log(`count=${totalCount} sum=${totalSum}`);
}

solve();
